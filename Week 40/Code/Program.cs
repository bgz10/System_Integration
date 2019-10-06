using System;
using System.Data.SQLite;
using System.Threading;

namespace Exercise_System_integration
{
    class Program
    {
        static void Main(string[] args)
        {
            var m_dbConnection = new SQLiteConnection("Data Source=data.db;Version=3;");
            m_dbConnection.Open();

            Console.WriteLine("Replacing the C document...");
            var query = "SELECT * FROM users WHERE status = 0 LIMIT 1";
            while(true)
            {
                Console.WriteLine("Get the next issue? [y/n]:");
                var choice = Console.ReadLine();
                if(choice.Equals("y"))
                {
                    using (var cmd = new SQLiteCommand(query, m_dbConnection))
                    {
                        using (SQLiteDataReader reader = cmd.ExecuteReader())
                        {
                            if(reader.Read()){
                                Console.WriteLine(reader[0] + " " + reader[1] + " " + reader[2] + " " + reader[3]);
                                Console.WriteLine("Is it solved yet?");
                                var solved = Console.ReadLine();
                                if(solved.Equals("y")){
                                    using (var update = new SQLiteCommand("UPDATE users SET status = 1 WHERE id=" + reader[0], m_dbConnection))
                                        {
                                            int rows = update.ExecuteNonQuery();
                                            if(rows != 0)
                                                Console.WriteLine("Update Successful");
                                        }
                                
                                }
                                else{
                                    continue;
                                }
                            } 
                            if(reader.Read() == false){
                                Console.WriteLine("There are no other issues to solve now.");
                            }
                        }
                    }
                    Thread.Sleep(2000);
                }
                else if (choice.Equals("n")){
                    break;
                }
            }
        }
    }
}
