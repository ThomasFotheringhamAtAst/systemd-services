
import SysService from '../index';

import chai = require("chai");
const expect = chai.expect;


const ns = new SysService()



describe("statuses", () => {
    it("a working process return a status that is active", (done) => {
        ns.status('networking').then((a: any) => {

            expect(a).to.be.ok;
            expect(a).to.be.an('object');
            expect(a.active).to.be.a('boolean').that.equal(true);
            expect(a.active_status).to.be.a('string');

            done()

        }).catch((err) => {
            done(Error(err))
        })
    })

    it("a foreign service return a non active status", (done) => {
        ns.status('lkgklglgoiuguoig').then((a: any) => {
            expect(a).to.be.ok;
            expect(a).to.be.an('object');
            expect(a.active).to.be.a('boolean').that.equal(false);
            expect(a.active_status).to.be.a('string');

            done()

        }).catch((err) => {
            done(Error(err))
        })
    })


})




describe("is-active", () => {
    it("an active service return true", (done) => {
        ns.isActive('networking').then((a: any) => {

            expect(a).to.be.ok;
            expect(a).to.be.a('boolean').that.equal(true);

            done()

        }).catch((err) => {
            done(Error(err))
        })
    })

    it("a foreign or inactive service return false", (done) => {
        ns.isActive('jrejoreig').then((a: any) => {
            expect(a).to.be.a('boolean').that.equal(false);
            done()
        }).catch((err) => {
            done(Error(err))
        })
    })

})

