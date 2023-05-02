```
# make virtual environment(가상환경 설정, python 3.11 버전 안됨!! 주의!)
py -3.10 -m venv .venv
# python -m venv .venv
source .venv/Scripts/activate

# download requirements
pip install -r requirements.txt

# .env 파일을 미리 만들어서 SECRET_KEY 값을 정해주어야 함.
# dumpdata
python manage.py dumpdata movies -o movies.json

# loaddata (db 없는 경우 migrate부터 시작)
python manage.py migrate
python manage.py loaddata movies.json
```

# Django Restful API 문서 확인
```
http://127.0.0.1:8000/api/v1/swagger/
```

# login API
## login
```
http://127.0.0.1:8000/api/v1/accounts/login/
```
[POST] body
* username
* password
* return key
```
{
    "key": "b3f603700116ea7c4754d44eeea44d30936e1e1d"
}
```

## logout
```
http://127.0.0.1:8000/api/v1/accounts/logout/
```
[POST] headers
* Authorization
* return 
```
{
    "detail": "로그아웃되었습니다."
}
```

## signup
```
http://127.0.0.1:8000/api/v1/accounts/signup/
```
[POST] body
* username
* password1
* password2
* return
```
{
    "key": "b3f603700116ea7c4754d44eeea44d30936e1e1d"
}
```

## social login
* naver : `http://127.0.0.1:8000/api/v1/accounts/naver/login/`
* google : `http://127.0.0.1:8000/api/v1/accounts/google/login/`
* kakao : `http://127.0.0.1:8000/api/v1/accounts/kakao/login/`
