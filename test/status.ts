
import SysService from '../index';

import chai = require("chai");
const expect = chai.expect;


const ns = new SysService()



describe("statuses", function () {
    it("a working process return a status that is active", function (done) {
        ns.status('networking').then((a: any) => {

            expect(a).to.be.ok;
            expect(a).to.be.an('object');
            expect(a.active).to.be.a('boolean').that.is.eq(true);
            expect(a.active_status).to.be.a('string');

            done()

        }).catch((err) => {
            done(Error(err))
        })
    })

    it("a foreign service return a non active status", function (done) {
        ns.status('lkgklglgoiuguoig').then((a: any) => {

            expect(a).to.be.ok;
            expect(a).to.be.an('object');
            expect(a.active).to.be.a('boolean').that.is.eq(false);
            expect(a.active_status).to.be.a('string');

            done()

        }).catch((err) => {
            done(Error(err))
        })
    })


})


