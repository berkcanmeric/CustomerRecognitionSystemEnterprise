﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CafeHubWeb.Models;

namespace CafeHubWeb.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
    public IActionResult CafeManagement()
    {
        return View("CafeManagement");
    }
    public IActionResult SignUp()
    {
        return View("SignUp");
    }
    public IActionResult ForgotPassword()
    {
        return View("ForgotPassword");
    }
    public IActionResult Privacy()
    {
        return View();
    }
 

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
    }
}