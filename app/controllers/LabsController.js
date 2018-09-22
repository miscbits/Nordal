module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
};

function index(req, res, next) {
	return res.status(200)
        .json({
          status: 'success'
        });
}

function show(req, res, next) {
	return res.status(200)
        .json({
          status: 'success'
        });
}

function store(req, res, next) {
	return res.status(200)
        .json({
          status: 'success'
        });
}

function update(req, res, next) {
	return res.status(200)
        .json({
          status: 'success'
        });
}

function destroy(req, res, next) {
	return res.status(200)
        .json({
          status: 'success'
        });
}
