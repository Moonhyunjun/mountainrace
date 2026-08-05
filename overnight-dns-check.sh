#!/usr/bin/env bash
# =============================================================================
# overnight.asia — 도메인 · SSL 연동 상태 자동 점검
#
#   ./overnight-dns-check.sh            한 번 검사
#   ./overnight-dns-check.sh --watch    60초마다 반복 (Ctrl+C 로 종료)
#   DOMAIN=other.com ./overnight-dns-check.sh   다른 도메인 검사
#
# 아임웹에 DNS 값을 입력한 뒤 이 스크립트를 돌리면
# 전파 · HTTPS · 리다이렉트 · 인증서 상태를 한 번에 확인할 수 있습니다.
# =============================================================================
set -uo pipefail

DOMAIN="${DOMAIN:-overnight.asia}"
WWW="www.${DOMAIN}"
TARGET_PATH="${TARGET_PATH:-/danyang}"
WATCH=0
[ "${1:-}" = "--watch" ] && WATCH=1

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
  R=$'\033[31m'; G=$'\033[32m'; Y=$'\033[33m'; B=$'\033[34m'; D=$'\033[2m'; N=$'\033[0m'
else
  R=""; G=""; Y=""; B=""; D=""; N=""
fi

ok()   { printf "  %s✔%s %s\n" "$G" "$N" "$1"; }
bad()  { printf "  %s✘%s %s\n" "$R" "$N" "$1"; }
warn() { printf "  %s!%s %s\n" "$Y" "$N" "$1"; }
info() { printf "  %s·%s %s\n" "$D" "$N" "$1"; }
head_() { printf "\n%s%s%s\n" "$B" "$1" "$N"; }

# ---- DNS 조회 도구 자동 선택 -------------------------------------------------
# dig 가 없는 환경(컨테이너 등)에서는 Cloudflare DNS-over-HTTPS 로 대체합니다.
DNS_MODE=""
if command -v dig >/dev/null 2>&1; then
  DNS_MODE="dig"
elif command -v curl >/dev/null 2>&1; then
  DNS_MODE="doh"
fi

lookup() { # $1=name  $2=type  -> 값들을 줄바꿈으로 출력
  local name="$1" type="$2"
  case "$DNS_MODE" in
    dig)
      dig +short "$type" "$name" @1.1.1.1 2>/dev/null | sed '/^$/d'
      ;;
    doh)
      curl -sS --max-time 12 -H 'accept: application/dns-json' \
        "https://cloudflare-dns.com/dns-query?name=${name}&type=${type}" 2>/dev/null \
        | grep -o '"data":"[^"]*"' | sed 's/"data":"//;s/"$//'
      ;;
    *)
      return 1
      ;;
  esac
}

# DNS 조회 자체가 되는 환경인지 먼저 확인합니다.
# 이걸 안 하면, 방화벽·프록시로 조회가 막힌 환경에서
# "레코드가 없다"고 잘못 보고하게 됩니다.
DNS_OK=1
dns_probe() {
  [ -z "$DNS_MODE" ] && { DNS_OK=0; return; }
  local probe
  probe="$(lookup "cloudflare.com" A)"
  [ -z "$probe" ] && DNS_OK=0
}

# 인증서의 CN/SAN 이 실제로 이 도메인을 가리키는지 확인 (와일드카드 포함)
cert_matches() { # $1=도메인  $2=cert 텍스트
  local d="$1" txt="$2" names wild
  names="$(printf "%s" "$txt" | grep -o 'DNS:[^,]*' | sed 's/DNS://; s/ //g')"
  names="$names
$(printf "%s" "$txt" | grep -o 'CN *= *[^,/]*' | sed 's/CN *= *//; s/ *$//')"
  wild="*.${d#*.}"
  printf "%s" "$names" | grep -qx -e "$d" -e "$wild"
}

run_check() {
  printf "%s══ overnight.asia 연동 점검 ══%s  %s\n" "$B" "$N" "$(date '+%Y-%m-%d %H:%M:%S')"
  info "검사 대상: ${DOMAIN}"

  if [ -z "$DNS_MODE" ]; then
    bad "dig 도 curl 도 없어 DNS 조회를 할 수 없습니다."
    info "설치: apt-get install -y dnsutils   (또는 brew install bind)"
    return 1
  fi
  [ "$DNS_MODE" = "doh" ] && info "dig 이 없어 Cloudflare DoH 로 조회합니다."

  dns_probe
  if [ "$DNS_OK" = "0" ]; then
    printf "\n%s DNS 조회 자체가 막혀 있습니다 %s\n" "$Y" "$N"
    warn "이 환경(방화벽·프록시·회사망)에서 외부 DNS 질의가 차단됐습니다."
    warn "아래 DNS 결과는 '레코드가 없다'는 뜻이 아니라 '확인할 수 없다'는 뜻입니다."
    warn "→ 개인 노트북이나 휴대폰 테더링에서 다시 돌려보세요."
    warn "→ 또는 whatsmydns.net 에서 overnight.asia 를 직접 조회하세요."
  fi

  # ---- 1. 네임서버 -----------------------------------------------------------
  head_ "1. 네임서버 (도메인이 등록되어 있는지)"
  local ns
  ns="$(lookup "$DOMAIN" NS)"
  if [ -n "$ns" ]; then
    ok "네임서버 확인됨"
    printf "%s" "$ns" | while IFS= read -r line; do info "$line"; done
  elif [ "$DNS_OK" = "0" ]; then
    warn "확인 불가 (DNS 조회 차단됨)"
  else
    bad "네임서버가 조회되지 않습니다."
    warn "→ 도메인이 아직 등록되지 않았거나, 등록 직후 전파 전입니다."
    warn "→ 구매처에서 ${DOMAIN} 소유 상태를 먼저 확인하세요."
  fi

  # ---- 2. A / CNAME ----------------------------------------------------------
  head_ "2. 루트 도메인 레코드 (${DOMAIN})"
  local a cname
  a="$(lookup "$DOMAIN" A)"
  cname="$(lookup "$DOMAIN" CNAME)"
  if [ -n "$a" ]; then
    ok "A 레코드 있음"
    printf "%s" "$a" | while IFS= read -r line; do info "→ $line"; done
    warn "이 IP가 아임웹 관리자 화면에 표시된 값과 같은지 눈으로 대조하세요."
  elif [ -n "$cname" ]; then
    ok "CNAME 있음 (플래트닝 사용 중)"
    printf "%s" "$cname" | while IFS= read -r line; do info "→ $line"; done
  elif [ "$DNS_OK" = "0" ]; then
    warn "확인 불가 (DNS 조회 차단됨)"
  else
    bad "루트에 A/CNAME 레코드가 없습니다 — 아직 DNS 입력 전이거나 전파 중입니다."
  fi

  head_ "3. www 레코드 (${WWW})"
  local wa wc
  wc="$(lookup "$WWW" CNAME)"
  wa="$(lookup "$WWW" A)"
  if [ -n "$wc" ]; then
    ok "www CNAME 있음"
    printf "%s" "$wc" | while IFS= read -r line; do info "→ $line"; done
  elif [ -n "$wa" ]; then
    ok "www A 레코드 있음"
    printf "%s" "$wa" | while IFS= read -r line; do info "→ $line"; done
  elif [ "$DNS_OK" = "0" ]; then
    warn "확인 불가 (DNS 조회 차단됨)"
  else
    warn "www 레코드가 없습니다. www 접속을 쓰실 거면 추가하세요."
  fi

  # ---- 4. CAA (SSL 발급 차단 원인) -------------------------------------------
  head_ "4. CAA 레코드 (SSL 발급 차단 여부)"
  local caa
  caa="$(lookup "$DOMAIN" CAA)"
  if [ "$DNS_OK" = "0" ]; then
    warn "확인 불가 (DNS 조회 차단됨)"
  elif [ -z "$caa" ]; then
    ok "CAA 없음 — SSL 자동발급에 지장 없습니다."
  else
    printf "%s" "$caa" | while IFS= read -r line; do info "$line"; done
    if printf "%s" "$caa" | grep -qi "letsencrypt"; then
      ok "letsencrypt 허용되어 있습니다."
    else
      bad "CAA가 있는데 letsencrypt 가 없습니다 — SSL 발급이 막힐 수 있습니다."
      warn "→ CAA를 삭제하거나 letsencrypt.org 를 허용 목록에 추가하세요."
    fi
  fi

  # ---- 5. HTTP / HTTPS 응답 --------------------------------------------------
  if ! command -v curl >/dev/null 2>&1; then
    head_ "5. 접속 확인"
    warn "curl 이 없어 접속 확인을 건너뜁니다."
    return 0
  fi

  head_ "5. 접속 확인"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 20 "https://${DOMAIN}" 2>/dev/null)"
  if [ "$code" = "200" ]; then
    ok "https://${DOMAIN} → 200 OK"
  elif [ "$code" = "000" ] || [ -z "$code" ]; then
    bad "https://${DOMAIN} 접속 실패 — DNS 전파 전이거나 SSL 발급 전입니다."
  else
    warn "https://${DOMAIN} → HTTP ${code}"
  fi

  local pcode
  pcode="$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 20 "https://${DOMAIN}${TARGET_PATH}" 2>/dev/null)"
  if [ "$pcode" = "200" ]; then
    ok "https://${DOMAIN}${TARGET_PATH} → 200 OK"
  elif [ "$pcode" = "000" ] || [ -z "$pcode" ]; then
    info "https://${DOMAIN}${TARGET_PATH} 아직 접속 불가"
  else
    warn "https://${DOMAIN}${TARGET_PATH} → HTTP ${pcode} (페이지를 아직 안 만드셨으면 정상)"
  fi

  # 루트 → /danyang 리다이렉트 확인 (접속이 실제로 됐을 때만 의미가 있습니다)
  if [ "$code" = "200" ]; then
    local final
    final="$(curl -sS -o /dev/null -w '%{url_effective}' -L --max-time 20 "https://${DOMAIN}" 2>/dev/null)"
    case "$final" in
      *"$TARGET_PATH"*) ok "루트 → ${TARGET_PATH} 리다이렉트 동작 중" ;;
      *) info "루트 최종 주소: ${final}"
         info "(메인페이지 지정 방식이면 리다이렉트 없이 이게 정상입니다)" ;;
    esac
  else
    info "리다이렉트 확인 생략 — 루트 접속이 아직 안 됩니다."
  fi

  # ---- 6. SSL 인증서 ---------------------------------------------------------
  head_ "6. SSL 인증서"
  if command -v openssl >/dev/null 2>&1; then
    local raw cert
    raw="$(echo | timeout 15 openssl s_client -servername "$DOMAIN" -connect "${DOMAIN}:443" 2>/dev/null)"
    cert="$(printf "%s" "$raw" | openssl x509 -noout -issuer -subject -dates -ext subjectAltName 2>/dev/null)"
    if [ -z "$cert" ]; then
      bad "인증서를 가져오지 못했습니다 — 아직 발급 전입니다."
      warn "→ Cloudflare 프록시(주황 구름)가 켜져 있으면 끄세요. 가장 흔한 원인입니다."
    elif cert_matches "$DOMAIN" "$cert"; then
      local issuer
      issuer="$(printf "%s" "$cert" | grep '^issuer')"
      # 아임웹이 붙여주는 인증서는 공인 CA(주로 Let's Encrypt) 발급입니다.
      # 사내 프록시·백신 SSL 검사는 도메인 이름이 맞는 가짜 인증서를 내주므로
      # 이름만 보고 '발급 완료'로 읽으면 안 됩니다.
      if printf "%s" "$issuer" | grep -qiE "let's encrypt|letsencrypt|zerossl|digicert|sectigo|comodo|google trust|amazon|globalsign|godaddy|buypass|certum"; then
        ok "인증서 발급됨 · ${DOMAIN} 에 유효합니다 (공인 CA)"
        printf "%s" "$cert" | grep -E 'issuer|notAfter' | while IFS= read -r line; do info "$line"; done
      else
        warn "인증서는 있는데 발급자가 공인 CA가 아닙니다."
        info "$issuer"
        warn "→ 사내망/백신의 SSL 검사(중간자)를 거치고 있을 가능성이 큽니다."
        warn "→ 개인 네트워크에서 다시 확인하거나, 브라우저 자물쇠를 눌러 직접 확인하세요."
      fi
    else
      # 도메인이 아직 안 붙었는데 공유 인증서·회사 프록시·파킹 서버가
      # 엉뚱한 인증서를 내주는 경우입니다. 이걸 '성공'으로 읽으면 안 됩니다.
      bad "인증서가 있지만 ${DOMAIN} 용이 아닙니다 — 아직 연결 전입니다."
      printf "%s" "$cert" | grep -E 'issuer|subject' | while IFS= read -r line; do info "$line"; done
      warn "→ 회사망/프록시를 거치고 있거나, 아임웹 SSL 발급이 아직 안 끝났습니다."
    fi
  else
    warn "openssl 이 없어 인증서 확인을 건너뜁니다."
  fi

  printf "\n%s상세 절차는 overnight-domain-setup.md 참고%s\n\n" "$D" "$N"
}

if [ "$WATCH" = "1" ]; then
  while true; do
    clear 2>/dev/null || true
    run_check
    printf "%s60초 후 재검사… (Ctrl+C 종료)%s\n" "$D" "$N"
    sleep 60
  done
else
  run_check
fi
