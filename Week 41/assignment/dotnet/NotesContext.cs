using Microsoft.EntityFrameworkCore;  

namespace Notes
{     
public class NotesContext : DbContext     
  {         
    public NotesContext(DbContextOptions<NotesContext> options) : base(options)         
{         
}       
    public DbSet<Note> NotesItems { get; set; }     
  
   } 
}