import { execSync as exec } from 'child_process';

function ip(type = 'default') {
  if (ip.present()) {
    return ip.exec(`docker-machine ip ${type}`, {
      encoding: 'utf8',

      // By default parent stderr is used, which is bad
      stdio: []
    }).trim();
  }

  return 'localhost';
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

export default ip;
