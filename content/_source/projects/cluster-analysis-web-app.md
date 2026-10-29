# project-1 → cluster-analysis-web-app

## Hugo front matter

```json
{
  "title": "Python Cluster Analysis App",
  "date": "2020-05-25T06:14:34.000Z",
  "image": "images/portfolio/input-section-clust-app-black.jpg",
  "categories": [
    "machine learning",
    "web development",
    "cloud"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Reuben Vandeventer"
    },
    {
      "name": "Private Project Link",
      "icon": "fas fa-link",
      "content": "https://synth3-s2shape.herokuapp.com/"
    },
    {
      "name": "New Item",
      "icon": "fas fa-globe",
      "content": "SecondSight has all rights to this product."
    }
  ]
}
```

## Hugo body

The goal of this project was to create a tool using which users can analyse data in various ways by applying machine learning clusterization and other methods on specific datasets. Target users may vary from person having some knowledge of clustering techniques but not coding and ML engineers as well. You can input your data, analyze it and output a file with insights.

#### Project Details

In order to use web application there was a workflow established. First, user should upload input dataset in csv or xlsx format. 
Then, so called record name column should be selected, which is considered a unique column. After that users can normalize data, select X, Y and Z lens, i.e. 3 dimesions for further analysis. Next user chooses from 3 available clustering algorithms DBSCAN, MeanShift, MST and hyperparameters for them. As output you get interactive D3 powered network graph. https://observablehq.com/@d3/force-directed-graph 

Finally, users can select nodes interesting for them which will be colored in specific colors based on dimensions. User chooses and outputs to csv or excel format with new columns which indicates some cluster ids and other useful information for future analysis.

## Catalogue entry

```json
{
  "id": "project-1",
  "title": "Python Cluster Analysis App",
  "site_title": "Python Cluster Analysis App",
  "date": "2020-05-25",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-1/",
  "client": "Reuben Vandeventer",
  "listed": true,
  "summary": "No-code clustering workbench: upload a dataset, pick dimensions and an algorithm, explore an interactive D3 network graph and export enriched results.",
  "themes": [
    "Classical ML & predictive modelling",
    "Data apps, dashboards & visualisation"
  ],
  "industries": [
    "B2B / SME services"
  ],
  "domains": [
    "Machine learning",
    "Web development",
    "Data visualisation",
    "Cloud"
  ],
  "skills": [
    "DBSCAN",
    "MeanShift",
    "MST clustering",
    "D3.js force-directed graphs",
    "Python",
    "CSV/XLSX I/O",
    "Data normalisation",
    "Heroku"
  ],
  "site_tags": [
    "Machine Learning",
    "Web Development",
    "Cloud"
  ],
  "role": "Sole developer (product owned by SecondSight)",
  "outcomes": [
    "Usable by non-coders and ML engineers alike: upload, normalise, choose X/Y/Z lenses, tune hyperparameters",
    "Interactive D3 force-directed graph with node selection and colouring by dimension",
    "Export back to CSV/Excel with cluster IDs appended for downstream analysis"
  ],
  "cv_bullet": "Built a self-serve clustering application for non-technical analysts — CSV/XLSX upload, normalisation, choice of DBSCAN / MeanShift / MST with tunable hyperparameters, an interactive D3 force-directed graph, and export of cluster IDs back to Excel.",
  "links": [
    {
      "label": "Private Project Link",
      "url": "https://synth3-s2shape.herokuapp.com/"
    },
    {
      "label": "Referenced",
      "url": "https://observablehq.com/@d3/force-directed-graph"
    }
  ],
  "notes": [
    "New Item: SecondSight has all rights to this product."
  ],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/input-section-clust-app-black.jpg",
  "source_text": "The goal of this project was to create a tool using which users can analyse data in various ways by applying machine learning clusterization and other methods on specific datasets. Target users may vary from person having some knowledge of clustering techniques but not coding and ML engineers as well. You can input your data, analyze it and output a file with insights.\n\n#### Project Details\n\nIn order to use web application there was a workflow established. First, user should upload input dataset in csv or xlsx format. Then, so called record name column should be selected, which is considered a unique column. After that users can normalize data, select X, Y and Z lens, i.e. 3 dimesions for further analysis. Next user chooses from 3 available clustering algorithms DBSCAN, MeanShift, MST and hyperparameters for them. As output you get interactive D3 powered network graph. https://observablehq.com/@d3/force-directed-graph\n\nFinally, users can select nodes interesting for them which will be colored in specific colors based on dimensions. User chooses and outputs to csv or excel format with new columns which indicates some cluster ids and other useful information for future analysis.",
  "also_published_as": []
}
```
