import express from "express";
import axios from "axios";
import pool from "../config/db.js";
const router = express.Router();
router.get("/fetch/all/data", async (req, res, next) => {
  try {

    const sqlQuery = `Select * from github_profiles`;
    const [rows] = await pool.query(sqlQuery);
   if (rows.length == 0) {
      const error = new Error("No data exists in database");
      error.statusCode = 400;
      return next(error);
    }
    return res.status(200).json({
      data: rows,
    });
  } catch (error) {
    return next(error);
  }
});
router.get("/fetch/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const sqlQuery = `Select * from github_profiles where username=?`;
    const [rows] = await pool.query(sqlQuery, [username]);
    if (rows.length == 0) {
      const error = new Error("Username not exist");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
  return next(error);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          "User-Agent": "github-profile-analyzer",
          Accept: "application/vnd.github+json",
        },
      },
    );
    const data = response.data;

    const sql_Query = `
    INSERT INTO github_profiles (username, name, followers, following, public_repos, profile_url) 
    VALUES (?, ?, ?, ?, ?, ?)
`;

    //put all the data inside array
    const values = [
      data.login,
      data.name,
      data.followers,
      data.following,
      data.public_repos,
      data.html_url, // Use html_url to get the actual profile link!
    ];

    // pass both the query as well as data to pool
    const [rows] = await pool.query(sql_Query, values);
    if (rows.affectedRows === 0) {
    const error = new Error("Insert failed");
    error.statusCode = 400;
    return next(error);
}

return res.status(201).json({
  success: true,
  message: "Profile saved successfully",
  insertId: rows.insertId
});
  } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
    error.statusCode = 409;
    error.message = "Profile already exists";
  }
      return next(error);
  }
});




export default router;
