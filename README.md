# AI chatbot
## to run backend server 

```
pip3 install -r app/requirements.txt
uvicorn app.main:app --reload
```
## to run FE server 

```
npm run dev
```
login should return jwt token for authentication it should be stored in local storage 
token should be valid for 1 hour

