node {
  stage('checkout') {
    checkout([
      $class                           : 'GitSCM',
      branches                         : [[name: 'master']],
      doGenerateSubmoduleConfigurations: false,
      extensions                       : [],
      submoduleCfg                     : [],
      userRemoteConfigs                : [
        [credentialsId: '283ec90c-febf-4add-94fa-5d6769cd017c',
         url          : 'git@git.nju.edu.cn:171250554/frontend.git'
        ]
      ]
    ])
  }

  stage("npm") {
    nodejs(configId: '89bce46f-98db-47c9-9f93-715126ae44ab', nodeJSInstallationName: 'nodejs') {
      //sh 'npm set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ && npm install --unsafe-perm -g node-sass'
      //sh 'npm install --unsafe-perm && '
      //sh 'npm run build'
    }
  }

  stage("tar") {
    sh "tar -cvzf se3frontend.tar.gz dist Dockerfile nginx.conf"
  }

  stage("remote") {
    sshPublisher(
      publishers: [
        sshPublisherDesc(
          configName: '47.103.192.117',
          transfers: [
            sshTransfer(
              cleanRemote: false,
              excludes: '',
              execCommand: '''rm -rf /root/se3frontend && mkdir /root/se3frontend && cd /root/se3frontend && tar -xzf /se3frontend.tar.gz
docker rm -f se3www
cd /root/se3frontend && docker build -f Dockerfile -t se3vue . && docker run -d -p 80:80 --link se3:se3 --name se3www se3vue:latest''',
              execTimeout: 120000,
              flatten: false,
              makeEmptyDirs: false,
              noDefaultExcludes: false,
              patternSeparator: '[, ]+',
              remoteDirectory: '',
              remoteDirectorySDF: false,
              removePrefix: '',
              sourceFiles: 'se3frontend.tar.gz'
            )
          ],
          usePromotionTimestamp: false,
          useWorkspaceInPromotion: false,
          verbose: false
        )
      ]
    )
  }

//  stage("docker-build") {
//    sh "docker build -f Dockerfile -t se3vue ."
//  }
//
//  stage("restart") {
//    try {
//      sh "docker rm -f se3www"
//    } catch (ignored) {
//      echo('WWW container not created')
//    }
//    sh "docker run -d -p 80:80 --link se3:se3 --name se3www se3vue:latest"
//  }
}
