exports.dashboard = (req, res, next) => {
  let template = './errorPage';
  // if(res.locals.admin)
  template = './admin/dashboard';
  res.status(200).render(template);
  next();
};

exports.userManagement = (req, res, next) => {
  let template = './errorPage';
  // if(res.locals.admin)
  template = './admin/userManagement';
  res.status(200).render(template);
  next();
};

exports.instituteManagement = (req, res, next) => {
  let template = './errorPage';
  // if(res.locals.admin)
  template = './admin/instituteManagement';
  res.status(200).render(template);
  next();
};

exports.logout = (req, res, next) => {
  res.status(200).render('logout');
  next();
};
