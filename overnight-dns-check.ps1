<#
  ============================================================================
  overnight.asia - 네임서버 위임 확인 (Windows PowerShell 용)

  사용법
    1) 시작 메뉴에서 "PowerShell" 검색해서 실행
    2) 이 파일이 있는 폴더로 이동:   cd C:\경로\mountainrace
    3) 실행:                        .\overnight-dns-check.ps1

    실행이 차단되면 (스크립트 실행 정책):
      powershell -ExecutionPolicy Bypass -File .\overnight-dns-check.ps1

  이 스크립트가 하는 일
    후이즈에서 바꾼 네임서버가 .asia 레지스트리에 실제로 반영됐는지
    확인합니다. 아임웹 관리자 화면의 "현재 네임서버" 표시는 지연되므로
    그 칸 대신 이걸로 판단하세요.

  ★ 설치 없이 확인하려면 whatsmydns.net 에서 overnight.asia 를 NS 로 조회하셔도 됩니다.
  ============================================================================
#>

param(
  [string]$Domain = "overnight.asia",
  [string[]]$ExpectNs = @(
    "bns1.hostcocoa.com",
    "bns2.hostcocoa.com",
    "bns3.hostcocoa.com",
    "bns4.hostcocoa.com"
  )
)

function Say($msg, $color = "Gray") { Write-Host "  $msg" -ForegroundColor $color }
function Head($msg) { Write-Host "`n$msg" -ForegroundColor Cyan }

Write-Host "`n== overnight.asia 네임서버 확인 ==  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
Say "대상: $Domain"

if (-not (Get-Command Resolve-DnsName -ErrorAction SilentlyContinue)) {
  Say "이 PowerShell 에는 Resolve-DnsName 이 없습니다." "Red"
  Say "대신 명령 프롬프트에서:  nslookup -type=NS $Domain 8.8.8.8" "Yellow"
  Say "또는 whatsmydns.net 에서 NS 로 조회하세요." "Yellow"
  exit 1
}

# ---- 1. 공용 리졸버 기준 (캐시 영향 있음) ----------------------------------
Head "1. 공용 리졸버 (1.1.1.1) 기준"
$pub = @()
try {
  $pub = @(Resolve-DnsName -Name $Domain -Type NS -Server "1.1.1.1" -DnsOnly -ErrorAction Stop |
           Where-Object { $_.NameHost } |
           ForEach-Object { $_.NameHost.TrimEnd('.').ToLower() } |
           Sort-Object -Unique)
} catch {
  Say "조회 실패: $($_.Exception.Message)" "Yellow"
}
if ($pub.Count -gt 0) { $pub | ForEach-Object { Say "-> $_" } }
else { Say "결과 없음 (아직 전파 전이거나 캐시)" "Yellow" }

# ---- 2. 레지스트리(.asia) 직접 조회 — 캐시 우회 -----------------------------
Head "2. 레지스트리 직접 조회 (캐시 우회 · 이게 진짜 값)"
$reg = @()
try {
  $tld = $Domain.Substring($Domain.IndexOf('.') + 1)
  $tldNs = @(Resolve-DnsName -Name $tld -Type NS -Server "1.1.1.1" -DnsOnly -ErrorAction Stop |
             Where-Object { $_.NameHost } |
             ForEach-Object { $_.NameHost })
  if ($tldNs.Count -eq 0) { throw "TLD 네임서버를 찾지 못했습니다." }

  $reg = @(Resolve-DnsName -Name $Domain -Type NS -Server $tldNs[0] -DnsOnly -ErrorAction Stop |
           Where-Object { $_.NameHost } |
           ForEach-Object { $_.NameHost.TrimEnd('.').ToLower() } |
           Sort-Object -Unique)

  if ($reg.Count -gt 0) { $reg | ForEach-Object { Say "-> $_" "Green" } }
  else { Say "레지스트리에 위임 정보가 없습니다 - 후이즈에서 제출이 안 됐습니다." "Red" }
} catch {
  Say "조회 실패: $($_.Exception.Message)" "Yellow"
}

# ---- 3. 판정 ----------------------------------------------------------------
Head "3. 판정"
if ($reg.Count -eq 0) {
  Say "아직 반영 안 됨. 후이즈 '네임서버 관리'에서 적용/신청까지 눌렀는지 확인하세요." "Red"
} else {
  $missing = @($ExpectNs | Where-Object { $reg -notcontains $_.TrimEnd('.').ToLower() })
  if ($missing.Count -eq 0) {
    Say "OK - 기대한 네임서버 $($ExpectNs.Count)개가 모두 반영됐습니다." "Green"
    if ($pub.Count -gt 0 -and (Compare-Object $pub $reg)) {
      Say "공용 리졸버는 아직 옛 값을 들고 있습니다 (캐시). 기다리시면 됩니다." "Yellow"
    }
    Say "다음 단계: 아임웹에서 보안서버(SSL)를 신청하세요. 개인 도메인은 자동이 아닙니다." "Cyan"
  } else {
    Say "아직 반영되지 않은 값:" "Red"
    $missing | ForEach-Object { Say "   누락: $_" "Red" }
    Say "레지스트리에 올라온 값은 위 2번 목록입니다. 후이즈 입력값과 대조하세요." "Yellow"
  }
}

# ---- 4. 접속 확인 -----------------------------------------------------------
Head "4. https://$Domain 접속"
try {
  $r = Invoke-WebRequest -Uri "https://$Domain" -TimeoutSec 20 -UseBasicParsing -ErrorAction Stop
  Say "HTTP $($r.StatusCode) - 접속됩니다." "Green"
} catch {
  Say "아직 접속 안 됨 (네임서버 전파 전이거나 SSL 미신청)" "Yellow"
}

Write-Host "`n상세 절차는 overnight-domain-setup.md 참고`n" -ForegroundColor DarkGray
