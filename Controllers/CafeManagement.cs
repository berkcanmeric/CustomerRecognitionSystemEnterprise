using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CafeHubWeb.Models;

namespace CafeHubWeb.Controllers;

public class CafeManagement : Controller
{
    private readonly ILogger<CafeManagement> _logger;

    public CafeManagement(ILogger<CafeManagement> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
    public IActionResult Customers()
    {
        return View("Customers");
    }
    public IActionResult Payment()
    {
        return View("Payment");
    }
  
 

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
    }
}