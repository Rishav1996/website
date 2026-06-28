import urllib.request, json, base64

repos = [
    "LLMDriftExperiment",
    "PyCaretAgent",
    "CognitoEDA",
    "AWS-ML-Services",
    "PyCaret-MLOps",
    "AI-MLOps-TimeSeries"
]

with open("full_readmes.txt", "w", encoding="utf-8") as f:
    for repo in repos:
        url = f"https://api.github.com/repos/Rishav1996/{repo}/readme"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
                readme_content = base64.b64decode(data['content']).decode('utf-8')
                f.write(f"\n\n{'='*50}\nREPO: {repo}\n{'='*50}\n")
                f.write(readme_content)
        except Exception as e:
            f.write(f"Error fetching {repo}: {e}")
