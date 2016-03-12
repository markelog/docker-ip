import { execSync as exec } from 'child_process';

function ip(type = 'default') {
  const isLinux = ip.platform === 'linux';

  if (!ip.present()) {
    if (isLinux) {
      return 'localhost';
    }

    return null;
  }

  return ip.exec(`docker-machine ip ${type}`, {
    encoding: 'utf8',

    // By default parent stderr is used, which is bad
    stdio: []
  }).trim();
}

ip.present = () => {

  try {
    ip.exec('docker-machine version && echo $?', {
      encoding: 'utf8',

      // By default parent stderr is used, which is bad
      stdio: []
    }).trim();
  } catch (e) {
    return false;
  }

  return true;
};

ip.exec = exec;
ip.platform = process.platform;

export default ip;
