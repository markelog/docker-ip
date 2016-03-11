import { execSync as exec } from 'child_process';

function ip(type) {
  type = type || 'default';
  const isLinux = ip.platform === 'linux';

  if (!ip.present()) {
    if (isLinux) {
      return 'localhost';
    }

    return null;
  }

  return ip.exec(`docker-machine ip ${type}`, { encoding: 'utf8' }).trim();
}

ip.present = () => {
  const result = ip.exec('docker-machine version && echo $?', { encoding: 'utf8' }).trim();

  if (result === '127') {
    return false;
  }

  return true;
};

ip.exec = exec;
ip.platform = process.platform;

export default ip;
