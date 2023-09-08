# CSIT321
This repository will be the main product that we will be designing and developing for our FYP project.


Jira Backlog: https://csit314-project.atlassian.net/jira/software/projects/CSIT/boards/2/backlog
Figma: https://www.figma.com/files/team/1261903488080582373/CSIT321?fuid=1223836359823368264

# Running The App
Default port (3000) 
```javascript
npm install or npm install --legacy-peer-deps
npm start
```

# Running The Backend
Default port (5001) or 10000 on Render(Cloud Deployment)
```javascript
npm install
npm run dev
```

# Useful Commands
```
Create new branch
git checkout -b "feature/name"

Change to another branch
git checkout develop

Pull the latest changes
git fetch
git pull

Pushing your changes
git add "filename"
git commit -m "message"
git log -> to check your commit message has been added correctly
git push
```

# Making Commits  

## Branch Naming Format  
Branches should be named according to this format:  

(Action)/(Brief Description)  

Actions include:  
- feature  
- bugfix  
- refactor  

For Example: 

feature/home-page  

## Message Format
Commit messages should follow this format:

(Message Heading) :: (Short Description)

For Example:

Added :: Login flow validation

## Message Heading
Message Headings should be strictly limited to:
- Added
- Refactored
- Deleted