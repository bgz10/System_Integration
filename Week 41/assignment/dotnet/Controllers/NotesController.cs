using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Notes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly ILogger<NotesController> _logger;
        private readonly NotesContext _context;
        public NotesController(NotesContext context){
            _context = context;

            if(_context.NotesItems.Count() == 0){
                var today = DateTime.Now;
                var bytes = BitConverter.GetBytes(today.Ticks);
                Array.Resize(ref bytes, 16);
                var guid = new Guid(bytes);
                var x = _context.NotesItems.Add(new Note{ Id = guid.ToString(), Title = "First", Content = "something"});
            }
        }

        [HttpGet("/api/notes")]
        public ActionResult<List<Note>> GetAllNotes() => _context.NotesItems.ToList();


        [HttpGet("/api/note/{id}")]
        public IActionResult GetNoteById(string id)
        {
            var item = _context.NotesItems.Find(id);     
            if (item == null){         
                return NotFound();     
            }     
            return Ok(item); 
        }


        [HttpPost("/api/note")]
        public ActionResult<Note> CreateNote(FormCollection collection)
        {
            var note = new Note{
                Id = getGuid(),
                Title = collection["title"],
                Content = collection["content"]
            };
            _context.NotesItems.Add(note);
            return note;
        }
                
                
        [HttpPut("/api/note/{id}")]
        public ActionResult<Note> UpdateNoteById(string id, FormCollection collection)
        {
            var note = _context.NotesItems.Find(id);
            if(note == null)
                return null;
            note.Title = collection["title"];
            note.Content = collection["content"];
            _context.NotesItems.Update(note);
            return note;
        }

        [HttpDelete("/api/note/{id}")]
        public ActionResult<Note> DeleteNoteById(string id)
        {
            var note = _context.NotesItems.Find(id);
            if(note == null)
                return null;
            _context.NotesItems.Remove(note);
            return note;

        }
        
        private string getGuid(){
            var today = DateTime.Now;
                    var bytes = BitConverter.GetBytes(today.Ticks);
                    Array.Resize(ref bytes, 16);
                    var guid = new Guid(bytes);
            return guid.ToString();
        }
    }
}
