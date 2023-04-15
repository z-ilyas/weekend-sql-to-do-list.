CREATE TABLE "to-do-list" (
    "id" SERIAL PRIMARY KEY,
    "tasks" VARCHAR(100) NOT NULL,
	"status" VARCHAR(100) NOT NULL
);

INSERT INTO "to-do-list"
("tasks", "status")
VALUES
('When will I finish this Task', 'complete'),
('I exist merely to be used as a test', 'pending'),
('Stop being lazy and do the Task', 'pending');