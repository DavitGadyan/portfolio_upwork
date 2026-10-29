# project-26 → yield-curve-pca-quant-pipeline

## Hugo front matter

```json
{
  "title": "Quant / Python / PCA Analysis",
  "date": "2024-04-29T06:14:34.000Z",
  "image": "images/portfolio/pca_stocks-anal.png",
  "categories": [
    "deep learning",
    "machine learning",
    "financial analysis"
  ],
  "description": "",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Jonathan Cooper"
    }
  ]
}
```

## Hugo body

Project goals were to build a streamlined Python pipeline to perform PCA analysis on different sectors of the yield curve and flag which sectors were cheap or expensive based on their residuals.

### Project Details

In this project I engineered a Python program that ingests sector-by-sector yield-curve data from Bloomberg (via the xbbg library), preprocesses it using pandas, numpy and StandardScaler, and then applies Principal Component Analysis (PCA) from scikit-learn to extract the dominant curve movements. By reconstructing each sector’s yields from the top principal components and measuring the residuals, the system automatically identifies mispriced (cheap/expensive) segments. Optional KMeans clustering was incorporated for grouping similar residual patterns, and results are visualized with Matplotlib and Plotly for interactive analysis.

## Catalogue entry

```json
{
  "id": "project-26",
  "title": "Quant / Python / PCA Analysis",
  "site_title": "Quant / Python / PCA Analysis",
  "date": "2024-04-29",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-26/",
  "client": "Jonathan Cooper",
  "listed": true,
  "summary": "Python pipeline applying PCA to yield-curve data by sector, flagging cheap or expensive sectors from reconstruction residuals.",
  "themes": [
    "Quantitative finance & trading",
    "Classical ML & predictive modelling"
  ],
  "industries": [
    "Finance & capital markets"
  ],
  "domains": [
    "Quantitative finance",
    "Machine learning",
    "Fixed income"
  ],
  "skills": [
    "Python",
    "Bloomberg data via xbbg",
    "pandas",
    "numpy",
    "scikit-learn",
    "PCA",
    "StandardScaler",
    "KMeans",
    "Matplotlib",
    "Plotly"
  ],
  "site_tags": [
    "Deep Learning",
    "Machine Learning",
    "Financial Analysis"
  ],
  "role": "Sole quant engineer",
  "outcomes": [
    "Dominant curve movements extracted via PCA; residuals automatically flag mispriced segments",
    "Optional KMeans clustering of similar residual patterns",
    "Interactive visual output for analyst review"
  ],
  "cv_bullet": "Engineered a quant pipeline ingesting sector yield-curve data from Bloomberg (xbbg) and applying scikit-learn PCA to flag cheap/expensive curve sectors from reconstruction residuals, with optional KMeans grouping and interactive Plotly output.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/pca_stocks-anal.png",
  "source_text": "Project goals were to build a streamlined Python pipeline to perform PCA analysis on different sectors of the yield curve and flag which sectors were cheap or expensive based on their residuals.\n\n### Project Details\n\nIn this project I engineered a Python program that ingests sector-by-sector yield-curve data from Bloomberg (via the xbbg library), preprocesses it using pandas, numpy and StandardScaler, and then applies Principal Component Analysis (PCA) from scikit-learn to extract the dominant curve movements. By reconstructing each sector’s yields from the top principal components and measuring the residuals, the system automatically identifies mispriced (cheap/expensive) segments. Optional KMeans clustering was incorporated for grouping similar residual patterns, and results are visualized with Matplotlib and Plotly for interactive analysis.",
  "also_published_as": []
}
```
