using System;
using System.Collections.Generic;
using System.Net;
using System.Web;
using System.Collections.Specialized;
using System.IO;
using HttpUtility;

namespace c_sharp_client
{
    class Program
    {
        static void Main(string[] args)
    	{
 
        	Console.WriteLine("insert phone number: ");
        	var toPhone = Console.ReadLine();
        	Console.WriteLine("insert message: ");
        	var message = HttpUtility.UrlEncode(Console.ReadLine());
        	var apiKey = "YOUR KEY HERE";
 
        	string url = string.Format("https://fatsms.com/apis/api-send-sms?to-phone={0}&message={1}&from-phone=YOUR_PHONE_HERE&api-key={2}", toPhone, message, apiKey);
        	Console.WriteLine(message);
 
        	Console.WriteLine(url);
 
        	HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
        	HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        	//Stream resStream = response.GetResponseStream();
        	Console.WriteLine(response);
    	}
    }
}
