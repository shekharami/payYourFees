const { unlink } = require('fs');
const XLSX = require('xlsx');
const Institute = require('../../models/institutes');
const Student = require('../../models/students');
const Fees = require('../../models/fees');
const mongoose = require('mongoose');

exports.getInstitutes = async (req, res, next) => {
  try {
    const institutes = await Institute.find().select(
      'name email phone address addrressDistrict addressState addressPincode'
    ); //.sort({name: -1 })
    if (['/', '/link-student'].includes(req.url)) {
      res.locals.institutes = institutes.map((i) => {
        return { name: i.name, id: i._id };
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          length: institutes.length,
          institutes
        }
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.locals.institutes = ['Error fetching institute names'];
    if (req.url !== '/') {
      res.status(200).json({
        status: 'fail',
        error: err.message
      });
    }
  }

  next();
};

exports.getInstituteDetails = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (user) {
      const data = await Institute.findById({ _id: req.params.instituteId });
      res.locals.data = data;
      return next();
    } else {
      const data = await Institute.findById({ _id: req.params.instituteId });
      res.status(200).json({
        status: 'success',
        data
      });
    }
  } catch (err) {
    console.log(err);
  }

  next();
};

exports.updateInstituteData = async (req, res, next) => {
  try {
    const note = await Institute.findByIdAndUpdate(
      {
        _id: res.locals.institute._id
      },
      {
        $set: {
          class: req.body.classes,
          gst: req.body.gst,
          pan: req.body.pan
        },
        createdAt: Date.now()
      },
      {
        new: true
      }
    );
    console.log(note);

    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      error: err.message
    });
  }

  next();
};

exports.searchInstitutes = async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    console.log(ree.stack);
    res.status(200).json({
      status: 'fail',
      error: err.message
    });
  }
  next();
};

exports.deleteInstitute = async (req, res, next) => {
  //change this to work as the world works, set delete flag to true
  try {
    await Institute.findOneAndDelete({ _id: req.params.id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.log(err);
  }

  next();
};

exports.fileUpload = async (req, res, next) => {
  try {
    let redirectLink = '/institute/add-students';
    if (req.file.mimetype.includes('spreadsheet')) {
      const workbook = XLSX.readFile(req.file.path);
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      // upload those files in database
      // console.log(xlData);
      xlData.forEach(async (o) => {
        await Student.create({
          name: o.Name,
          father: o.Father,
          mother: o.Mother,
          email: o.Email,
          phone: o.Phone,
          address: o.Address,
          registrationNo: o['Registration No.'],
          class: o.Class,
          section: o.Section,
          rollNo: o['Roll No.'],
          institute: res.locals.institute._id //fill in institute from res.locals.institute
        });
      });

      //delete file from file system
      unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    } else {
      redirectLink += '?error=error-parsing-file';
    }

    res.redirect(redirectLink);
  } catch (err) {
    console.log(err);
  }

  next();
};

exports.feesDetails = async (req, res, next) => {
  try {
    const fees = await Fees.find({
      institute: mongoose.Types.ObjectId(res.locals.institute._id),
      active: true
    }).sort('-addedAt');
    res.locals.fees = fees;
  } catch (err) {
    console.log(err.stack);
  }
  next();
};

exports.feesManagement = async (req, res, next) => {
  try {
    console.log(req.body);
    const fee = await Fees.create({
      institute: mongoose.Types.ObjectId(res.locals.institute._id),
      name: req.body.name,
      numeralWeight: 0,
      desc: req.body.desc,
      amount: req.body.amount,
      classes: req.body.applicableTo,
      payBy: req.body.payBy
    });

    res.status(200).json({
      status: 'success',
      data: fee
    });
  } catch (err) {
    console.log(err.stack);
    res.status(200).json({
      status: 'fail',
      error: err.message
    });
  }
  next();
};

exports.getDetails = async (req, res, next) => {
  try {
    const students = await Student.find({
      institute: mongoose.Types.ObjectId(res.locals.institute._id),
      class: req.query.class,
      section: req.query.section,
      deletedAt: null
    })
      .select('name rollNo father mother')
      .sort('rollNo');
    res.status(200).json({
      status: 'success',
      data: {
        length: students.length,
        students
      }
    });
  } catch (err) {
    console.log(err.stack);
    res.status(200).json({
      status: 'fail',
      error: err.message
    });
  }
  next();
};
