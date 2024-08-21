# Image Upload Frontend

이 프로젝트는 이미지 업로드, 조회, 삭제 기능을 제공하는 React 기반의 프론트엔드 애플리케이션입니다. AWS S3와 CloudFront를 활용하여 정적 파일과 이미지를 호스팅 및 캐싱하며, 백엔드와의 상호작용을 통해 이미지 관리 기능을 제공합니다.

## 🛠️ 기능

- **이미지 업로드**: 사용자가 이미지를 업로드할 수 있습니다.
- **이미지 조회**: 업로드된 이미지를 조회하여 화면에 표시할 수 있습니다.
- **이미지 삭제**: 업로드된 이미지를 삭제할 수 있습니다.

## 🌐 배포

- **정적 파일 배포**: 이 애플리케이션의 정적 파일은 AWS S3에 호스팅되며, CloudFront를 통해 캐싱되어 빠르게 제공됩니다.
- **이미지 관리**: 업로드된 이미지는 별도의 S3 버킷에 저장되며, CloudFront를 통해 캐싱되어 빠르게 조회할 수 있습니다.

## 🚀 사용 방법

### 1. 프로젝트 클론 및 설치

```bash
git clone https://github.com/nicolao00/ImageUpload-front.git
cd ImageUpload-front
npm install
```

### 2. 로컬 개발 서버 실행

```bash
npm start
```

애플리케이션이 `http://localhost:3000`에서 실행됩니다.

### 3. 프로덕션 빌드 및 배포

```bash
npm run build
aws s3 sync build/ s3://your-react-app-s3-bucket --acl public-read
```

빌드된 파일들은 S3에 업로드되고, CloudFront를 통해 제공됩니다.

## 🖥️ 백엔드

이 프론트엔드는 [ImageUpload-S3 백엔드](https://github.com/nicolao00/ImageUpload-S3)와 상호작용하여 이미지 업로드, 조회, 삭제 기능을 제공합니다. 백엔드는 AWS S3와 연동되어 이미지 파일을 저장하고 관리합니다.
