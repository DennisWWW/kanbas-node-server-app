import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async(req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async(req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.delete("/api/courses/:assignmentId/assignments", async(req, res) => {
    const { assignmentId } = req.params;
    await assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  })

  app.put("/api/courses/:assignmentId/assignments", async(req, res) => {
    const {assignmentId} = req.params;
    const assignmentUpdates = req.body;
    await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.sendStatus(204);
  })

}