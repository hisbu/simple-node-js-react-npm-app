#!/bin/bash
sed "s/tagVersion/$1/g" k8s_svc_deploy.yaml > web-app-deployment.yml