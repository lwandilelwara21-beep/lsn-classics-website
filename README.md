LSN Classics — Static Website

This is a static marketing site for LSN Classics student accommodation.

Branding: the site uses the official LSN Classic colours and logo.

Local preview

Run a simple static server from the project folder and open http://127.0.0.1:8000/

```bash
python -m http.server
```

Publish options

1) GitHub Pages (recommended if you have a GitHub account)
- Create a repository on GitHub.
- From the project folder run:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

- In the GitHub repository, go to Settings → Pages and select `main` branch and `/ (root)` folder, save.

2) Netlify (no Git required)
- Go to https://app.netlify.com/drop and drag the entire project folder onto the page. Netlify will publish the site and give you a live link.

3) Vercel
- Sign up at https://vercel.com, import your GitHub repo and deploy.

If you'd like, tell me which provider to use and I will provide the exact steps for publishing and DNS configuration (if needed). If you want, I can also generate a zipped site ready for upload.
