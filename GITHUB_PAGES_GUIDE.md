# Deploying Your CV Website to GitHub Pages

Follow these simple steps to host your CV website for free using GitHub Pages.

## Step 1: Initialize Git Repository Locally

Open your terminal in the project folder (`c:\Users\Admin\mycvsite`) and run the following commands:

1.  **Initialize Git:**
    ```bash
    git init
    ```

2.  **Add all files:**
    ```bash
    git add .
    ```

3.  **Commit your changes:**
    ```bash
    git commit -m "Initial commit of CV website"
    ```

## Step 2: Create a Repository on GitHub

1.  Log in to your [GitHub account](https://github.com).
2.  Click on the **+** icon in the top-right corner and select **New repository**.
3.  **Repository name:** Enter a name like `my-cv-site` or `portfolio`.
4.  **Description:** Optional (e.g., "My personal CV website").
5.  **Public/Private:** Choose **Public** (required for free GitHub Pages unless you have Pro).
6.  **Initialize with README:** Leave this **UNCHECKED** (since we already have a local repo).
7.  Click **Create repository**.

## Step 3: Push Your Code to GitHub

After creating the repository, GitHub will show you a "Quick setup" page. Look for the section **"…or push an existing repository from the command line"**.

Run these commands in your local terminal (replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with actual values):

1.  **Add the remote origin:**
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    ```

2.  **Push to the main branch:**
    ```bash
    git branch -M main
    git push -u origin main
    ```

## Step 4: Enable GitHub Pages

1.  Go to your repository on GitHub.
2.  Click on the **Settings** tab.
3.  In the left sidebar, click on **Pages** (under the "Code and automation" section).
4.  Under **"Build and deployment"**:
    -   **Source:** Select **Deploy from a branch**.
5.  Under **"Branch"**:
    -   Select **main**.
    -   Select the folder as **/(root)** (default).
    -   Click **Save**.

## Step 5: View Your Live Site!

Wait a minute or two for GitHub to build your site. Refresh the Pages settings page, and you will see a banner at the top saying:

> **Your site is live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`**

Click the link to see your deployed CV website!
