import urllib.request
import re

url = "https://saverrarealty.com/assets/index-CLTIMIBj.js"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print(f"Loaded index-CLTIMIBj.js, size: {len(content)} bytes")
        matches = re.findall(r'/assets/[a-zA-Z0-9_\-\.]+\.js', content)
        unique_assets = set(matches)
        print(f"Found {len(unique_assets)} asset references in index JS")

        missing = []
        for asset in list(unique_assets)[:15]:
            asset_url = f"https://saverrarealty.com{asset}"
            try:
                asset_req = urllib.request.Request(asset_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(asset_req) as a_resp:
                    ct = a_resp.headers.get('Content-Type')
                    if a_resp.status != 200:
                        missing.append((asset, a_resp.status, ct))
                    else:
                        print(f"OK: {asset} ({ct})")
            except Exception as e:
                missing.append((asset, str(e)))

        print("Missing/Error Assets:", missing)

except Exception as e:
    print("Error loading index JS:", e)
