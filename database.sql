CREATE TABLE "to-do-list" (
    "id" SERIAL PRIMARY KEY,
    "tasks" VARCHAR(100) NOT NULL,
	"completed" VARCHAR(100) NOT NULL
);

INSERT INTO "to-do-list"
("tasks", "completed")
VALUES
('When will I finish this Task', 'Not Done huh?'),
('Stop being lazy and do the Task', 'Not Done huh?');