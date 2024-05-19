import os

from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi_sso.sso.google import GoogleSSO

from utils.configs import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET


app = FastAPI()

def get_google_sso() -> GoogleSSO:
    return GoogleSSO(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirect_uri="http://localhost:3000/api/auth/callback")


# Function to verify if user is authenticated
def is_authenticated(google_sso: GoogleSSO = Depends(get_google_sso)):
    async def verify_auth(request: Request):
        user = await google_sso.verify_and_process(request=request)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not authenticated")
        return user
    return verify_auth

# Protected route that requires authentication
@app.get("/api/protected")
async def protected_endpoint(user = Depends(is_authenticated)):
    return {"message": "This endpoint is protected and can only be accessed by authenticated users."}

@app.get("/api/auth/login")
async def google_login(google_sso: GoogleSSO = Depends(get_google_sso)):
    return await google_sso.get_login_redirect()

@app.get("/api/auth/callback")
async def google_callback(request: Request, google_sso: GoogleSSO = Depends(get_google_sso)):
    user = await google_sso.verify_and_process(request)
    return user
