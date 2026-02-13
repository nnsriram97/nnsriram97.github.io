# Sriram Narayanan — Personal Website

Personal academic website built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).

## Local Development

```bash
# Install dependencies
bundle install

# Start dev server (http://localhost:4000)
bundle exec jekyll serve
```

## Adding Content

### Publications
Edit `_data/publications.yml`. Each entry has these fields:

```yaml
- title: "Paper Title"
  authors: "Author 1, <strong>Your Name</strong>, Author 3"
  venue: "Conference Name"
  year: 2025
  type: conference    # conference | patent | preprint
  oral: false
  featured: true      # show on homepage
  thumbnail: "/images/publications/filename.jpg"
  links:
    - label: "Paper"
      url: "https://..."
    - label: "Code"
      url: "https://..."
  abstract: "Optional abstract text..."
```

### Projects
Edit `_data/projects.yml`:

```yaml
- title: "Project Name"
  description: "One paragraph description"
  thumbnail: "/images/projects/filename.png"
  year: 2024
  tags: ["robotics", "computer-vision"]
  featured: true
  links:
    - label: "Video"
      url: "https://..."
```

### Navigation
Edit `_data/navigation.yml` to add/remove nav links.

### News Items
Edit the `news` front matter in `index.md`:

```yaml
news:
  - date: "MM/YY"
    text: "News item text with <a href='url'>links</a>."
```

## Dark Mode
The site supports light/dark mode via a toggle in the navbar. Theme preference is persisted in `localStorage` and defaults to the user's system preference.

## Deployment
Push to the `main` branch. GitHub Pages will automatically build and deploy.