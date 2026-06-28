

==================================================
REPO: LLMDriftExperiment
==================================================
# LLM Drift Experiment

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/release/python-3120/)
[![Version 0.1.4](https://img.shields.io/badge/version-0.1.4-orange.svg)](https://github.com/Rishav1996/LLMDriftExperiment/releases/tag/v0.1.4)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20032071.svg)](https://doi.org/10.5281/zenodo.20032071)

> A high-fidelity research platform for simulating adversarial multi-agent interactions to observe **LLM Drift**: the phenomenon where large language models deviate from their established personas, reasoning standards, and emotional baselines.

## Abstract

**LLM Drift Experiment** is a specialized framework designed to investigate whether adversarial social pressure causes systematic, measurable behavioral decay in instruction-following models, even when explicitly directed to maintain a fixed identity. Using a LangGraph-based multi-agent debate engine, the platform subjects LLMs to adversarial exchanges. The framework employs a rigorous simulation and data archiving lifecycle to observe behavioral shifts over time.

---

## Research Philosophy

The framework is explicitly designed for **observation, not correction**: it provides a high-fidelity lens into the behavioral stability of models under stress. By framing agents as **battlefield army bots** on a digital terrain, we seek to uncover the "calcification" points where models transition from dialectical growth to repetitive, high-dominance stagnation. Agents must navigate the tension between **territorial defense** (protecting their statements) and **psychological assault** (breaking the enemy's persona).

---

## Table of Contents

- [What is LLM Drift?](#what-is-llm-drift)
- [Research Lifecycle](#research-lifecycle)
- [Project Structure](#project-structure)
- [Simulation Engine](#simulation-engine-debate_agents)
  - [Architecture](#architecture)
  - [The Refinement Loop](#the-refinement-loop)
  - [State Machine Graph](#state-machine-graph)
- [Data Layer](#data-layer)
  - [Memory Architecture](#memory-architecture)
- [Research & Publications](#research--publications)
- [How to Cite](#how-to-cite)
- [Limitations](#limitations)
- [Setup & Usage](#setup--usage)
- [Configuration](#configuration)
- [Extending the Framework](#extending-the-framework)
- [License](#license)

---

## What is LLM Drift?

LLM Drift refers to the measurable behavioral change that occurs when a language model, assigned a specific persona and role, gradually deviates from that assignment over the course of a long, adversarial conversation. This project studies drift across five behavioral dimensions: Psychometric, Personality (OCEAN), Affective, Cognitive/Structural, and Social/Relational.

The central hypothesis: **adversarial pressure causes systematic drift** even in models instructed to maintain a fixed persona. This framework provides the tooling to observe and record that drift.

---

## Research Lifecycle

The project follows a modular research lifecycle:

1. **RESEARCH** — Define the behavioral vectors and metrics for analysis (stored in `LLM Drift Skills/`).
2. **SIMULATION** — Execute adversarial debates via `debate_agents/` (LangGraph).
3. **DATA** — Archive memory snapshots after every simulation into `Research Runs/`.

---

## Project Structure

```
debate_agents/                  # Simulation engine (LangGraph state machine)
│
├── agents/
│   ├── pros_agent.py           # Pros team: Persona + Thinking + Critique chains
│   └── cons_agent.py           # Cons team: Persona + Thinking + Critique chains
│
├── config/
│   └── config.py               # Central model config (version, temp, tokens)
│
├── graph.py                    # LangGraph workflow definition
├── main.py                     # Simulation entrypoint
│
├── memory/                     # Live working memory (reset each run)
│   ├── shared_memory.json      # Approved arguments visible to both teams
│   ├── pros_memory/
│   │   ├── persona.json        # Internal: persona history (Pros)
│   │   ├── thinking.json       # Internal: reasoning history (Pros)
│   │   └── critique.json       # Internal: critique history (Pros)
│   └── cons_memory/
│       ├── persona.json        # Internal: persona history (Cons)
│       ├── thinking.json       # Internal: reasoning history (Cons)
│       └── critique.json       # Internal: critique history (Cons)
│
├── prompts/                    # System prompts for all agent roles
│   ├── pros/ and cons/         # Agent-specific prompts (persona, thinking, critique)
│   └── topic_extract_agent.md  # Topic refinement prompt
│
└── schema/                     # Pydantic output schemas
    ├── pros_schema.py
    ├── cons_schema.py
    └── topic_extract_schema.py

LLM Drift Skills/               # Metric definitions (Markdown, human-readable)
│   ├── persona_dna.md          # Master index of all metrics + scoring formula
│   ├── affective/              # Sentiment, Valence, Arousal, Subjectivity, Toxicity
│   ├── cognitive_structural/   # TTR, Info Density, Cognitive Load, Persona Drift
│   ├── personality/            # OCEAN model (Big Five)
│   ├── psychometric/           # Analytical Thinking, Clout, Authenticity, Emotional Tone
│   └── social_relational/      # Dominance, Linguistic Sync, Politeness, Theory of Mind

Drift Analysis/                 # Historical analytical outputs from previous versions
```

---

## Simulation Engine: `debate_agents/`

### Architecture

![Debate Agent Workflow](debate_agents/assets/graph.png)

The simulation uses **LangGraph** to orchestrate a stateful, multi-agent debate framed as a high-stakes combat engagement. Two teams — **Pros** (Battlefield Commander) and **Cons** (Battlefield Commander) — take turns over a configurable number of rounds. Each team iterates through an internal **refinement loop** to choose between defensive fortification and aggressive innovation.

### The Refinement Loop & Strategic Posture

In every round, each sub-agent must internally select a **Strategic Posture**:

- **PROTECT**: Defend the territory. Prioritize logical defense and factual integrity.
- **ATTACK**: Launch a bold assault. Prioritize character-consistent, fearless innovation.

---

## Data Layer

### Memory Architecture

The memory system uses JSON files as the persistence layer, organized around **team isolation**:

| File | Visibility | Contents |
| :--- | :--- | :--- |
| `shared_memory.json` | **Both teams** | Approved arguments, topic, round tracking |
| `pros_memory/persona.json` | **Pros only** | Full persona design history |
| `pros_memory/thinking.json` | **Pros only** | Chain-of-thought + draft arguments |
| `pros_memory/critique.json` | **Pros only** | Internal audit feedback |

---

## Research & Publications

The development and findings of this framework have been documented in a three-part series on *Towards AI*:

1.  **[Do AI Models Lose Themselves? Exploring LLM Drift through Adversarial Debate](https://pub.towardsai.net/do-ai-models-lose-themselves-exploring-llm-drift-through-adversarial-debate-a37e0c75012b)**
2.  **[LangGraph Multi-Agent Architecture: Building a Self-Critiquing AI Debate System](https://pub.towardsai.net/langgraph-multi-agent-architecture-building-a-self-critiquing-ai-debate-system-971a7ad881d9)**
3.  **[Measuring Behavioral Drift in LLMs: 22 Signals, 5 Dimensions, and the Calcification Effect](https://pub.towardsai.net/measuring-behavioral-drift-in-llms-22-signals-5-dimensions-and-the-calcification-effect-aeaeb904d096)**

---

## How to Cite

### APA Style
Saigal, R. (2026). *LLM Drift Experiment: A Framework for Simulating Behavioral Decay in Adversarial Multi-Agent Interactions* (Version 0.1.4) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.20032071

### BibTeX
```bibtex
@software{Saigal_LLMDriftExperiment_2026,
  author    = {Saigal, Rishav},
  title     = {{LLM Drift Experiment: A Framework for Simulating Behavioral Decay in Adversarial Multi-Agent Interactions}},
  month     = {5},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.20032071},
  url       = {https://doi.org/10.5281/zenodo.20032071}
}
```

---

## Limitations

- **Subjectivity**. Behavior is interpreted within an adversarial combat frame.
- **Non-determinism**. LLM API outputs vary across calls.
- **Evaluation scope**. Surface-level linguistic and stylistic signals only.

---

## Setup & Usage

```bash
# Install dependencies
uv sync

# Set up environment variables
cp .env.example .env

# Run simulation
uv run python -m debate_agents.main
```

---

## Configuration

All simulation parameters live in `debate_agents/config/config.py`.

```python
CONFIG = {
    "version":        "v9",
    "model_name":     "google_genai:gemini-3.1-pro-preview",
    "temperature":    1,
    "max_tokens":     4096,
    "thinking_budget": 2048
}
```

---

## License

This project is licensed under the **Apache License 2.0**.


==================================================
REPO: PyCaretAgent
==================================================
# PyCaretAgent

`PyCaretAgent` is an autonomous AI agent framework that extends **PyCaret** with advanced reasoning and tool-use capabilities using the **Google Generative AI SDK (google-adk)**. It bridges the gap between natural language requirements and production-ready machine learning pipelines.

## 🚀 Overview

`PyCaretAgent` implements a high-precision autonomous ML system. A **Supervisor Agent** (Router) orchestrates specialized **Sub-Agents** (Classification, Regression, etc.), which are designed as **Senior ML Automation Architects** capable of handling the entire lifecycle from data intelligence to model persistence.

## ✨ Key Features

-   **Natural Language ML:** Trigger complex PyCaret workflows using simple English commands.
-   **Autonomous ML Lifecycle:** Sub-agents handle analysis, planning, and execution in a single unified flow.
-   **Offline-First Architectural Design:** Focused on high-precision execution without dependency on external internet research tools.
-   **Advanced Reasoning (Centralized Planner):** All agents leverage a centralized `BuiltInPlanner` configured with an optimized **4096 thinking budget** for deep architectural reasoning.
-   **Data Intelligence:** Uses a dedicated `csv_analytics_tool` to programmatically retrieve schemas, distributions, and null counts before pipeline design.
-   **Code Execution & Function Limits:**
    -   **Strict Function Limit:** Agents are mandated to use ONLY the provided PyCaret functions listed in the instructions.
    -   **Markdown Code Execution:** Uses the ADK's internal code execution triggered by ```python markdown blocks.
-   **Programmatic Session Tracking:** Uses `session_id_generator_tool` to ensure every run is uniquely identified and isolated.
-   **Structured Workspace Management:** Automatically creates and organizes artifacts into `plots/`, `models/`, and `metrics/` sub-directories within isolated session folders.
-   **Self-Correction & Robustness:** 
    -   **Automatic Error Recovery:** Executors use `error_retry_attempts=10` to automatically rerun and fix code on failure.
    -   **Task Finality:** Agents provide comprehensive final summaries and conclude tasks to exit the control loop efficiently.
-   **Isolated Session Storage:** ALL session-specific artifacts are saved in `runs/{session_id}/`.

## 🏗️ Architecture

### 1. Supervisor Agent
The primary entry point (an `Agent`) that validates user requirements (e.g., CSV path validation via `csv_validator_tool`) and routes the request to the appropriate specialized sub-agent.

### 2. Specialized Sub-Agents (Senior ML Automation Architects)
Sub-agents (Classification, Regression, Clustering, Anomaly, Time Series) are implemented as highly specialized `LlmAgent` instances:
-   **Data Intelligence Phase:** Analyzes dataset metadata using `csv_analytics_tool`.
-   **Architectural Phase:** Designs the ML pipeline and generates a unique `SESSION_ID`.
-   **Execution Phase:** Implements the pipeline using PyCaret, saving all code, data snapshots, models, and visualizations.
-   **Verification & Deployment Phase:** Handover to `deploy_agent` to create a production package in `runs/{session_id}/deploy/` (running on **Port 5000**):
    -   `deploy.py`: FastAPI REST API wrapper with Pydantic data models.
    -   `test.py`: Automated integration test script for the API.
    -   `requirements.txt`: Environment dependencies for deployment.
    -   `dockerfile`: Containerization script for cloud deployment (python:3.11-slim).
    -   `local-instructions.md`: Step-by-step guide for local Docker deployment.
    -   `aws-instructions.md`: Guide for deploying to AWS (ECR/ECS).
    -   `gcp-instructions.md`: Guide for deploying to GCP (Cloud Run).
    -   `azure-instructions.md`: Guide for deploying to Azure (ACR/ACI).
-   **Organization Phase:** Persists all artifacts into a structured directory hierarchy.

## 📁 Project Structure

```text
PyCaretAgent/
├── pycaretagent/
│   ├── agent.py               # Root Orchestrator (Router)
│   ├── __init__.py
│   └── utils/
│       ├── config.py          # Centralized configuration (Planners, Models)
│       ├── callbacks.py       # Centralized execution flow & state logic
│       ├── agents/            # Specialized Sub-Agent Definitions
│       │   ├── anomaly_agent.py
│       │   ├── classification_agent.py
│       │   ├── clustering_agent.py
│       │   ├── deploy_agent.py
│       │   ├── regression_agent.py
│       │   └── ts_agent.py
│       ├── instructions/      # Role-based System Prompts (Optimized)
│       │   ├── anomaly_prompt.py
│       │   ├── classification_prompt.py
│       │   ├── clustering_prompt.py
│       │   ├── common_prompt.py
│       │   ├── deploy_prompt.py
│       │   ├── regression_prompt.py
│       │   ├── route_prompt.py
│       │   └── ts_prompt.py
│       └── tools/             # Reusable Agent Tools
│           ├── file_validator_tool.py
│           ├── file_ops_tool.py       # Safe Write/Copy/Find operations
│           ├── csv_analytics_tool.py
│           └── session_id_generator_tool.py
├── runs/                      # Isolated Session Storage ({session_id}/)
├── sample_dataset/            # Organized test datasets with instructions
├── conductor/                 # Project management & track specifications
├── pyproject.toml             # Dependency management (uv/pip)
└── README.md                  # Project documentation
```

## 🛠️ Getting Started

### Prerequisites
-   Python 3.11 or higher.

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/PyCaretAgent.git
    cd PyCaretAgent
    ```
2.  **Install dependencies:**
    ```bash
    uv pip install .
    ```

### Basic Usage
Initialize the root agent and provide a path to your dataset:
```python
from pycaretagent.agent import root_agent
```
Example prompt: *"Perform a classification task on 'sample_dataset/classification/heart.csv' where the target is 'target'."*

## 📊 Sample Runs

For reference, the following session IDs in the `runs/` directory correspond to specific ML tasks:

| Task Type | Session ID | Key Artifacts |
| :--- | :--- | :--- |
| **Regression** | `S3Y66V` | `final_regression_model.pkl`, `residuals.png`, `feature_importance.png` |
| **Classification** | `WHGV1L` | `final_pipeline.pkl`, `feature_importance.png`, `results.csv` |
| **Time Series** | `F34R8N` | `final_ts_model.pkl`, `results.csv` |
| **Clustering** | `IFHGX6` | `amazon_clustering_model.pkl`, `logs.txt` |
| **Anomaly Detection** | `DC04XC` | `iforest_mango_model.pkl`, `price_dist.png` |

Each run includes a complete `deploy/` package with FastAPI wrappers and multi-cloud deployment guides.

## 📄 License
This project is licensed under the MIT License.


==================================================
REPO: CognitoEDA
==================================================
# 🚀 CognitoEDA

[![GitHub release](https://img.shields.io/github/release/Rishav1996/CognitoEDA.svg)](https://github.com/Rishav1996/CognitoEDA/releases)
[![GitHub branches](https://badgen.net/github/branches/Rishav1996/CognitoEDA)](https://github.com/Rishav1996/CognitoEDA/)
[![GitHub commits](https://badgen.net/github/commits/Rishav1996/CognitoEDA)](https://github.com/Rishav1996/CognitoEDA/commit/)
[![GitHub latest commit](https://badgen.net/github/last-commit/Rishav1996/CognitoEDA)](https://gitHub.com/Rishav1996/CognitoEDA/commit/)

**CognitoEDA** is an agentic workflow for automated Exploratory Data Analysis (EDA) using Large Language Models (LLMs) and Pandas. The project leverages LangChain, LangGraph, and Google Gemini models to extract metadata, generate EDA queries, and produce human-readable structured reports from tabular data.

---

## ✨ Features

- **Automated Metadata Extraction:**  
  Uses LLM agents to analyze a DataFrame and suggest relevant EDA steps.
- **Agentic Query Execution:**  
  Dynamically executes EDA queries on your data using a secure, sandboxed Python environment.
- **Structured Reporting:**  
  Converts EDA results into a human-friendly, structured document.
- **Interactive UI:**
  A Streamlit application provides a user-friendly interface for uploading data, running the EDA process, and viewing the results.
- **Extensible Workflow:**  
  Modular design for easy extension with new agents, prompts, or data sources.

---

## 📁 Project Structure

```
CognitoEDA/
│
├── src/
│   ├── app.py             # Main Streamlit application
│   ├── graph.py           # Core agentic workflow logic
│   ├── page_section/      # Streamlit pages for the UI
│   │   ├── __init__.py
│   │   ├── agent_page.py
│   │   ├── history_page.py
│   │   └── intro_page.py
│   ├── static/
│   │   └── graph.png
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── agents.py      # Agent definitions
│   │   ├── helper.py      # Helper functions
│   │   ├── prompt.py      # Prompt templates
│   │   ├── schema.py      # Pydantic schemas
│   │   └── support_tools.py # Custom tools for agents
│   └── utils/             # Utility scripts
│       ├── __init__.py
│       └── helper.py
│
├── .gitignore
├── pyproject.toml
├── README.md
├── requirements.txt
└── uv.lock
```

---

## ⚙️ How It Works

The application follows an agentic workflow orchestrated by LangGraph. The process is initiated and visualized in a Streamlit web interface.

1.  **User Interaction (Streamlit UI):**
    -   The user uploads a CSV file and specifies the target column and problem type (e.g., classification, regression).
    -   The main application is in `src/app.py`, which routes the UI to different pages defined in `src/page_section/`.

2.  **Agentic Workflow (`src/graph.py`):**
    -   The core logic is defined in `src/graph.py` as a state machine.
    -   **Metadata Extractor Agent:**  Analyzes the dataset's schema and proposes initial EDA steps.
    -   **Python Pandas Coder Agent:** Executes the EDA steps using Pandas and captures the results.
    -   **Structure Creator Agent:**  Organizes the EDA results into a structured format.
    -   **Statistics Generator Agent:**  Generates further statistical analysis questions.
    -   **Python Statistics Coder Agent:** Executes the statistical queries.
    -   **Business Insights Agent:**  Generates business insights from the collected data.
    -   **Web Developer Agent:**  Creates an HTML report summarizing the findings.

3.  **MLflow Integration:**
    -   The application is integrated with MLflow for experiment tracking and logging of agent runs.

---

## 📈 Agentic Workflow

![Application Agentic Workflow](src/static/graph.png)

---

## 🚦 Example Usage

1. **Create a virtual environment:**  
   ```bash
   uv venv
   ```

2. **Install dependencies:**  
   ```bash
   uv add -r requirements.txt
   ```

3. **Run the MLflow server:**
   ```bash
   uv run mlflow server
   ```

4. **Run the application:**  
   ```bash
   uv run streamlit run ./src/app.py
   ```

5. **Access the application:**  
   Open your web browser and navigate to the URL provided by Streamlit (usually `http://127.0.0.1:8501`).

---

## 🎥 Demo

Here is a short video demonstrating the application in action:

<video controls src="https://raw.githubusercontent.com/Rishav1996/CognitoEDA/main/src/static/video.mp4" title="CognitoEDA Demo"></video>

---

## 📝 Requirements

- Python 3.11+
- All dependencies are listed in [`requirements.txt`](requirements.txt) and [`pyproject.toml`](pyproject.toml).

---

## 🛠️ Key Technologies

- [LangChain](https://python.langchain.com/)
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [Google Gemini (via LangChain)](https://python.langchain.com/docs/integrations/chat/google_genai)
- [Pandas](https://pandas.pydata.org/)
- [Pydantic](https://docs.pydantic.dev/)
- [MLflow](https://mlflow.org/)
- [Streamlit](https://docs.streamlit.io/)
- [Streamlit Option Menu](https://pypi.org/project/streamlit-option-menu/)
- [pytest](https://docs.pytest.org/)
- [python-dotenv](https://pypi.org/project/python-dotenv/)
- [arxiv](https.pypi.org/project/arxiv/)
- [duckduckgo-search](https://pypi.org/project/duckduckgo-search/)


---

## ⚠️ Security Notice

The Pandas agent executes code in a Python REPL.  
**Ensure your environment is secure** and do not use untrusted data or prompts.

---

## 🧩 Customization

- **Prompts:**  
  Modify `src/tools/prompt.py` to change how the LLMs are instructed.
- **Schemas:**  
  Update `src/tools/schema.py` to adjust output formats.
- **Agents:**  
  Extend or modify agent logic in `src/tools/agents.py`.
- **Tools:**  
  Add or modify agent tools in `src/tools/support_tools.py`.

---

## 📄 License

This project is for research and educational purposes. Please review dependencies for their respective licenses.


==================================================
REPO: AWS-ML-Services
==================================================
## **AWS ML Services POC**

#### Face Matching Project
---
The objective of the project is to match the face of the person in a resume in real time while video streaming

- Under **facial analysis** we are extracting the facial features like the direction it is looking 
- Under **resume verifier** we are identifying if the resume submitted face is matching the candidate in real time

#### Speech Recognition Project
---

The objective of the project is to extract the characteristics of the recorded voice

#### Text Analytics Project
---

The objective of the project is to show the capabilities of AWS Comprehend & Hugging Face 

Example :-
- NER
- Question Answering Session
- Text Sentiment Analysis

#### Transcribe Project
---

The objective of the project is to convert the speech to text in real time

Here we are using AWS Transcribe, below we have shared a cosine similarity metrics.

- Short Text Accuracy - 97.25%
- Long Text Accuracy - 88.5%


==================================================
REPO: PyCaret-MLOps
==================================================
 
# MLOps Using PyCaret
In this project we are demoing, how to use PyCaret module and deploy a model on AWS and Hugging Face

### Steps to setup the project

- Create an environment of python version 3.7 and download respective packages **PyCaret, Scikit-learn, boto3, fastapi, load-dotenv and pandas**
- Create a .env file as given below
~~~
AWS_ACCESS_KEY_ID = 'XXXXXX'
AWS_SECRET_ACCESS_KEY = 'XXXXXX'
AWS_ACCOUNT_ID = 'XXXXXX'
HUGGING_FACE_URL = https://{username}-{reponame}.hf.space/{route}
~~~  
- Trigger the notebooks in an order as mentioned below
~~~
Data Splitting Module -> Training & Deployment Module
~~~
- Upload the deploy module on the Hugging Face Space using Docker keep the repository public
- After the deploy module is running and up on the Hugging Face server continue with the final Notebook (Prediction Module.ipynb)


==================================================
REPO: AI-MLOps-TimeSeries
==================================================
# AI-MLOps-TimeSeries

A self-hosted MLOps platform for **time-series forecasting**. Upload a CSV of one
or more series, clean it (outlier detection + imputation), run a battery of
forecasting models with cross-validation, and explore the forecasts and accuracy
metrics in an interactive dashboard.

---

## 1. What it does

The platform runs every dataset through four sequential stages, each tracked by a
`train_id`:

1. **Ingestion** — a CSV is uploaded and its rows are loaded into the database.
2. **Data processing** — per series, outliers are detected (Isolation Forest, Local
   Outlier Factor, or Z-score) and the resulting gaps are imputed (linear, mean,
   median, or nearest).
3. **Forecasting** — each series is forecast with the selected models over expanding
   and/or sliding cross-validation windows. Single models: ARIMA, ETS, Naive,
   Polynomial Trend, Prophet, Theta. Plus an ensemble and an auto-ensemble.
4. **Metrics** — accuracy (RMSE, RMSPE, MAPE, AIC, BIC, Bias) and stability/drift
   (PSI, KS) metrics are computed and stored.

Results are served through a Streamlit dashboard and a React front end.

## 2. Architecture

```
frontend (React, :8001)
    └── backend (FastAPI, :8000)
            ├── celery_data_processing   (queue: data-processing-pipeline)
            ├── celery_forecasting        (queue: forecasting-pipeline, 2 replicas)
            ├── Redis (:6379)             — Celery broker / result backend
            └── MySQL (:8306 -> 3306)     — all persistent state

visualization (Streamlit, :8501)  — reads MySQL directly
flower_web (:5555)                 — Celery task monitoring
```

**Data model.** Each pipeline stage writes a new `data_id` worth of rows into
`data_table`, and the `train_history_table` row for a `train_id` links the ingestion
(`data_ing_id`), processed (`data_dp_id`) and forecast (`data_fcst_id`) outputs along
with status and timing. Stage status codes (`ING_E`, `DP_E`, `FCST_E`, …) come from
`parameter_table`. See [CLAUDE.md](CLAUDE.md) for the full table reference.

**Parallelism.** Data processing and forecasting fan work out across Celery tasks
(one per series, or per series×model) and wait for completion via a shared
`wait_for_tasks` helper.

## 3. Prerequisites

- **Docker** and **Docker Compose v2** — the only requirement to run the full stack.
- **[uv](https://docs.astral.sh/uv/)** and **Python 3.12** — only for local
  development / running tests outside Docker.

## 4. Quick start (Docker)

```bash
docker compose up --build
```

First run seeds the MySQL schema from `mysql/scripts/*.sql`. Once healthy:

| Service           | URL                       |
| ----------------- | ------------------------- |
| API (FastAPI)     | http://localhost:8000     |
| API health check  | http://localhost:8000/test |
| Front end (React) | http://localhost:8001     |
| Dashboard         | http://localhost:8501     |
| Flower (Celery)   | http://localhost:5555     |
| MySQL             | localhost:8306            |

> **Picking up code/dependency changes:** the Python services share code through a
> seeded named volume (`api_data`). After changing dependencies or rebuilding images,
> reset the volumes so the new content propagates:
> ```bash
> docker compose down -v && docker compose up --build
> ```

## 5. Local development (without Docker)

Each Python service is an independent **uv** project (`pyproject.toml` + `uv.lock`).
You need MySQL and Redis reachable at the hosts in `backend/global_config.py`
(defaults assume the Docker network).

**Backend (API):**
```bash
cd backend
uv sync                       # add --extra dev for tests
uv run uvicorn app:app --port 8000 --reload --host 0.0.0.0
```

**Celery workers** (run from `backend/`):
```bash
uv run celery -A data_processing.data_processing_pipeline worker -Q data-processing-pipeline -E --loglevel=INFO
uv run celery -A forecasting.forecasting_pipeline worker -Q forecasting-pipeline -E --loglevel=INFO
```

**Dashboard:**
```bash
cd visualization
uv sync
uv run streamlit run app.py
```

**Front end:**
```bash
cd frontend
npm install
npm start          # dev server; `npm run build` for production
```

## 6. Testing

**Unit tests** (hermetic — no DB or Redis needed) cover the outlier detectors,
imputers, every forecasting model wrapper, and the metric functions:

```bash
cd backend
uv sync --extra dev
uv run pytest tests/unit -q
```

**End-to-end integration test** drives ingest → process → forecast → metrics through
the API. It is skipped unless `RUN_INTEGRATION=1` and requires the stack to be up:

```bash
docker compose up --build -d          # ensure the API is healthy on :8000
./tests/run_integration.sh            # or: tests\run_integration.ps1 on Windows
```

The runner sets `RUN_INTEGRATION=1` and executes `backend/tests/integration`.
Override the target with `API_BASE_URL`.

## 7. Input data format

Uploaded CSVs must have these columns (order doesn't matter):

| Column   | Description                                      |
| -------- | ------------------------------------------------ |
| `period` | Date string. `YYYY-MM-DD` is canonical; `DD-MM-YYYY` is also accepted and normalized on ingestion (stored as `VARCHAR(10)`) |
| `ts_id`  | Integer series identifier                        |
| `value`  | Numeric observation                              |

Multiple series share one file, distinguished by `ts_id`. A ready-to-use example is
provided at [`sample data/sample.csv`](sample%20data/sample.csv) (two monthly series,
2020–2021).

## 8. Project layout

```
backend/            FastAPI app, Celery pipelines, models & metrics (uv project)
  control/          API helpers, ingestion, DB access
  data_processing/  outlier detectors, imputers, processing pipeline
  forecasting/      model wrappers, ensembles, CV splitters, forecasting pipeline
  metrics/          performance-metric calculation
  tests/            unit/ (hermetic) and integration/ (gated) tests
visualization/      Streamlit dashboard (uv project)
frontend/           React application
mysql/              Dockerfile + schema/seed scripts
docker-compose.yml  full-stack orchestration
```

## 9. Tech stack

Python 3.12 · FastAPI · Celery + Redis · MySQL 8 · SQLAlchemy 2 · pandas 2 ·
sktime · pmdarima · Prophet · scikit-learn · statsmodels · Streamlit · Plotly ·
React · packaged and locked with **uv**.
