using AjaxDemo.Data;
using AjaxDemo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace AjaxDemo.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=PeopleCars;Integrated Security=True;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(p);
            return Json(p);
        }


        public IActionResult GetPersonById(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            return Json(repo.GetById(id));
        }

        public IActionResult Delete(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePerson(id);
            return Json(id);
        }

        public IActionResult Update(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.UpdatePerson(person);
            return Json(person);
        }
    }
}