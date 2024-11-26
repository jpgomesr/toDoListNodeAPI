const express = require("express");
const axios = require("axios");
const task = require("./models/task");

const app = new express();

app.use(express.json());

const PORT = 3020;

app.post("/add_task", (req, res) => {
   try {
      const description = req.body.description;
      const title = req.body.title;

      task.create({
         descricao: description,
         data_criacao: new Date(),
         titulo: title,
      });

      res.status(200).json({
         message: "Tarefa adicionada com sucesso!",
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/get_task/:title", async (req, res) => {
   const title = req.params.title;

   try {
      const findTask = await task.findOne({ where: { titulo: title } });

      if (findTask) {
         res.status(200).json({
            task: findTask,
         });
      } else {
         res.status(404).json({
            message: "Tarefa não encontrada",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/get_all_tasks", async (req, res) => {
   try {
      const findAllTasks = await task.findAll();

      if (findAllTasks) {
         res.status(200).json({
            tasks: findAllTasks,
         });
      } else {
         res.status(404).json({
            message: "Lista de tarefas está vazia",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.delete("/delete_task/:title", async (req, res) => {
   const title = req.params.title;

   try {
      const deleted = await task.destroy({ where: { titulo: title } });

      if (deleted) {
         res.status(200).json({
            message: "Tarefa deletada com sucesso",
         });
      } else {
         res.status(404).json({
            message: "Tarefa não encontrado",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.put("/update_task/:title", async (req, res) => {
   const title = req.params.title;

   try {
      const alterTask = await task.findOne({ where: { titulo: title } });

      if (alterTask) {
         const newTitle = req.body.title;
         const newDescription = req.body.description;

         if (newTitle != null) {
            alterTask.titulo = newTitle;
         }
         if (newDescription != null) {
            alterTask.descricao = newDescription;
         }

         await alterTask.save();

         res.status(200).json({
            message: "Tarefa modificada com sucesso",
         });
      } else {
         res.status(404).json({
            message: "Tarefa não encontrado",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.listen(PORT, () => {
   console.log(`Online na porta: ${PORT}`);
});
