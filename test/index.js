import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

import ip from '../index.js';

chai.use(sinonChai);
const expect = chai.expect;

describe('docker-ip', () => {
  describe('ip.present', () => {
    it('should return `true` for "present" docker-machine', () => {
      sinon.stub(ip, 'exec', () => 'test');
      expect(ip.present()).to.equal(true);
      ip.exec.restore();
    });

    it('should return `false` for not "present" docker-machine', () => {
      sinon.stub(ip, 'exec', () => { throw new Error('test'); });
      expect(ip.present()).to.equal(false);
      ip.exec.restore();
    });
  });

  describe('not linux', () => {
    let old = ip.platform;
    beforeEach(() => {
      sinon.stub(ip, 'exec', () => 'test');
      ip.platform = 'not linux';
    });

    afterEach(() => {
      ip.exec.restore();
      ip.platform = old;
    });

    describe('if "docker machine" is present', () => {
      beforeEach(() => {
        sinon.stub(ip, 'present', () => true);
      });

      afterEach(() => {
        ip.present.restore();
      });

      it('should get `default` ip without arguments', () => {
        ip();
        expect(ip.exec.firstCall.args[0]).to.equal('docker-machine ip default');
        expect(ip.exec.firstCall.args[1]).to.deep.equal({
          encoding: 'utf8',
          stdio: []
        });
      });

      it('should get `dev` ip', () => {
        ip('dev');
        expect(ip.exec.firstCall.args[0]).to.equal('docker-machine ip dev');
        expect(ip.exec.firstCall.args[1]).to.deep.equal({
          encoding: 'utf8',
          stdio: []
        });
      });
    });

    describe('if "docker machine" is not present', () => {
      beforeEach(() => {
        sinon.stub(ip, 'present', () => false);
      });

      afterEach(() => {
        ip.present.restore();
      });

      it('should get `default` ip without arguments', () => {
        expect(ip()).to.equal(null);
        expect(ip.exec).to.not.be.called;
      });

      it('should get `dev` ip', () => {
        expect(ip('dev')).to.equal(null);
        expect(ip.exec).to.not.be.called;
      });
    });
  });

  describe('linux', () => {
    let old = ip.platform;
    beforeEach(() => {
      sinon.stub(ip, 'exec', () => 'test');
      ip.platform = 'linux';
    });

    afterEach(() => {
      ip.exec.restore();
      ip.platform = old;
    });

    describe('if "docker machine" is present', () => {
      beforeEach(() => {
        sinon.stub(ip, 'present', () => true);
      });

      afterEach(() => {
        ip.present.restore();
      });

      it('should get `default` ip without arguments', () => {
        ip();
        expect(ip.exec.firstCall.args[0]).to.equal('docker-machine ip default');
        expect(ip.exec.firstCall.args[1]).to.deep.equal({
          encoding: 'utf8',
          stdio: []
        });
      });

      it('should get `dev` ip', () => {
        ip('dev');
        expect(ip.exec.firstCall.args[0]).to.equal('docker-machine ip dev');
        expect(ip.exec.firstCall.args[1]).to.deep.equal({
          encoding: 'utf8',
          stdio: []
        });
      });
    });

    describe('if "docker machine" is not present', () => {
      beforeEach(() => {
        sinon.stub(ip, 'present', () => false);
      });

      afterEach(() => {
        ip.present.restore();
      });

      it('should get `default` ip without arguments', () => {
        expect(ip()).to.equal('localhost');
        expect(ip.exec).to.not.be.called;
      });

      it('should get `dev` ip', () => {
        expect(ip('dev')).to.equal('localhost');
        expect(ip.exec).to.not.be.called;
      });
    });
  });
});
