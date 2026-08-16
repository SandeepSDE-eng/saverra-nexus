import paramiko

def deploy():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to Hostinger server...")
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')
    print("Connected!")

    # 1. Fix node_modules permissions
    print("Fixing node_modules permissions...")
    stdin, stdout, stderr = client.exec_command("cd domains/saverrarealty.com/public_html && chmod -R +x node_modules/.bin 2>/dev/null || true")

    # 2. Pull latest git main branch on Hostinger
    print("Pulling latest git commits on Hostinger...")
    stdin, stdout, stderr = client.exec_command("cd domains/saverrarealty.com/public_html && git fetch --all && git reset --hard origin/main")
    print(stdout.read().decode())

    # 3. Fix permissions again for new files
    client.exec_command("cd domains/saverrarealty.com/public_html && chmod -R +x node_modules/.bin 2>/dev/null || true")

    # 4. Run build using Hostinger's Node.js 20 binary
    print("Building production bundle on Hostinger...")
    stdin, stdout, stderr = client.exec_command("cd domains/saverrarealty.com/public_html && export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && npm run build")
    out = stdout.read().decode()
    err = stderr.read().decode()
    print("STDOUT:", out)
    print("STDERR:", err)

    # 5. Sync build outputs to hbuilds nodejs directory and public_html
    print("Syncing build outputs to Passenger directory and public_html assets...")
    commands = [
        "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp",
        "mkdir -p /home/u278286324/domains/saverrarealty.com/hbuilds/config",
        "cp -rf /home/u278286324/domains/saverrarealty.com/public_html/.output/* /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/",
        "cp -rf /home/u278286324/domains/saverrarealty.com/public_html/.output/public/* /home/u278286324/domains/saverrarealty.com/public_html/",
        "touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt"
    ]

    for cmd in commands:
        stdin, stdout, stderr = client.exec_command(cmd)

    print("Full Hostinger Deployment Completed!")
    client.close()

if __name__ == "__main__":
    deploy()
