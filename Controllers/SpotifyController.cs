using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CafeHubWeb.Models;

namespace CafeHubWeb.Controllers;

public class SpotifyController : Controller
{
    private readonly ILogger<SpotifyController> _logger;

    public SpotifyController(ILogger<SpotifyController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
  
 

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
    }
}