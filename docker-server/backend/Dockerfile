FROM python:3.7.11

ENV PYTHONBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim
RUN apt-get -y install libsndfile1

RUN mkdir /docker-server
ADD . /docker-server

WORKDIR /docker-server

RUN pip install pip==20.3
RUN pip install --use-deprecated=legacy-resolver -r requirements.txt

# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]