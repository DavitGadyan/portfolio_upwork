# project-30 → ai-real-estate-development-platform

## Hugo front matter

```json
{
  "title": "AI Real Estate Analysis Program",
  "date": "2024-10-30T06:14:34.000Z",
  "image": "images/portfolio/ai_house.png",
  "categories": [
    "machine learning",
    "web scraping"
  ],
  "description": "",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Jake Happe"
    }
  ]
}
```

## Hugo body

Project goals were to build an AI‐driven real estate analysis platform that models and compares new‐construction scenarios—home styles, sizes, garages, basements, prices and locations—to pinpoint the most profitable builds on each lot.

### Project Details

- Built and deployed a Python Selenium web-scraping bot to log into our MLS portal and extract 365-day data on active, pending, and sold homes—capturing styles, garage count, square footage, basement finishing, prices, and geolocations.
- Ingested and harmonized MLS data via pandas and SQLAlchemy into a unified dataset of home attributes (ranch, 2-story, 1.5-story; above-ground size; attached garages; basement specs; sale price; location).
- Implemented a rule-based pro forma engine that calculates build costs, timelines, and sale schedules for customizable development scenarios.
- Developed an XGBoost-powered Automated Valuation Model (AVM) using historical comps to predict future home values and feed profit-and-risk KPIs.
- Modeled scenario KPIs—projected profit, ROI, time-to-sell—across hundreds of lot-and-home-style combinations under varying cost and market assumptions.
- Embedded regulatory constraints (zoning rules and quota limits in the American housing market) into the scenario engine so only compliant build options surface.
- Generated actionable recommendations, ranking lots by their highest-yield home style and configuration, complete with dynamic dashboards and exportable reports.
- Delivered full documentation and reproducible code, enabling seamless hand-off and future enhancements by the client’s in-house team.

## Catalogue entry

```json
{
  "id": "project-30",
  "title": "AI Real Estate Analysis Program",
  "site_title": "AI Real Estate Analysis Program",
  "date": "2024-10-30",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-30/",
  "client": "Jake Happe",
  "listed": true,
  "summary": "AI real-estate analysis platform that models new-construction scenarios per lot and ranks them by projected profit, ROI and time-to-sell.",
  "themes": [
    "Classical ML & predictive modelling",
    "Data engineering & web scraping",
    "Data apps, dashboards & visualisation"
  ],
  "industries": [
    "Real estate & construction"
  ],
  "domains": [
    "Machine learning",
    "Real estate",
    "Web scraping",
    "Decision support"
  ],
  "skills": [
    "Python",
    "Selenium",
    "pandas",
    "SQLAlchemy",
    "XGBoost",
    "Automated Valuation Model",
    "Pro forma / scenario modelling",
    "Dashboards"
  ],
  "site_tags": [
    "Machine Learning",
    "Web Scraping"
  ],
  "role": "End-to-end: scraping, data model, AVM, scenario engine, dashboards, handover",
  "outcomes": [
    "365-day MLS data (active, pending, sold) captured automatically",
    "XGBoost AVM feeding profit and risk KPIs",
    "Hundreds of lot-and-style combinations scored, with zoning and quota constraints enforced",
    "Full documentation and reproducible code for in-house handover"
  ],
  "cv_bullet": "Built an AI real-estate development platform: Selenium MLS scraper, pandas/SQLAlchemy data model, XGBoost automated valuation model and a rule-based pro forma engine scoring hundreds of lot-and-home-style scenarios on profit, ROI and time-to-sell within zoning constraints.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/ai_house.png",
  "source_text": "Project goals were to build an AI‐driven real estate analysis platform that models and compares new‐construction scenarios—home styles, sizes, garages, basements, prices and locations—to pinpoint the most profitable builds on each lot.\n\n### Project Details\n\n- Built and deployed a Python Selenium web-scraping bot to log into our MLS portal and extract 365-day data on active, pending, and sold homes—capturing styles, garage count, square footage, basement finishing, prices, and geolocations.\n- Ingested and harmonized MLS data via pandas and SQLAlchemy into a unified dataset of home attributes (ranch, 2-story, 1.5-story; above-ground size; attached garages; basement specs; sale price; location).\n- Implemented a rule-based pro forma engine that calculates build costs, timelines, and sale schedules for customizable development scenarios.\n- Developed an XGBoost-powered Automated Valuation Model (AVM) using historical comps to predict future home values and feed profit-and-risk KPIs.\n- Modeled scenario KPIs—projected profit, ROI, time-to-sell—across hundreds of lot-and-home-style combinations under varying cost and market assumptions.\n- Embedded regulatory constraints (zoning rules and quota limits in the American housing market) into the scenario engine so only compliant build options surface.\n- Generated actionable recommendations, ranking lots by their highest-yield home style and configuration, complete with dynamic dashboards and exportable reports.\n- Delivered full documentation and reproducible code, enabling seamless hand-off and future enhancements by the client’s in-house team.",
  "also_published_as": []
}
```
