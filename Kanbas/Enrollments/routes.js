import * as enrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {

  const enrollUserInCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      userId = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      userId = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  };
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}