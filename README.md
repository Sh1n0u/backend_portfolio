# Porfolio Back-end

## How to build
```bash
docker build -t portfolio-back --no-cache .
```

## How to push
```bash
docker pull shinou/portfolio-back
```

## How to run
```bash
docker run -d --env-file=.env -p 4000:80 shinou/portfolio-back
```
