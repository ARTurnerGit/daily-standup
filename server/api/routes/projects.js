const Project = require("../../models/project");

module.exports = function (router) {
  router.get("/projects", function (req, res) {
    const qry = { isActive: { $eq: true } };
    Project.find(qry)
      .sort({ name: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error finding active projects", error: err })
      );
  });

  router.post("/projects", function (req, res) {
    let project = new Project(req.body);
    project.save(function (err, project) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(project);
    });
  });
};
