using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace UdpClientApp
{
    class Program
    {
        static string userName;
        static int remotePort;
        static int localPort;
        static string remoteAddress;
        static List<(int, string)> historyList = new List<(int, string)>();
        static int id = 0;

        static void Main(string[] args)
        {
            try
            {
                Console.Write("Enter user name: ");
                userName = Console.ReadLine();
                Console.Write("Enter your port: ");
                localPort = Int32.Parse(Console.ReadLine());
                Console.Write("Enter your friend ip: ");
                remoteAddress = Console.ReadLine();
                Console.Write("Enter friend port: ");
                remotePort = Int32.Parse(Console.ReadLine());
                Console.Clear();
                Thread receiveThread = new Thread(new ThreadStart(ReceiveMessage));
                receiveThread.Start();
                while (true)
                    SendMessage();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        private static void SendMessage()
        {
            UdpClient sender = new UdpClient();
            try
            {
                while (true)
                {
                    string message = Console.ReadLine();
                    historyList.Add((id, userName + " " + message));
                    message = String.Format("{0} {1}: {2}", id, userName, message);
                    byte[] data = Encoding.Unicode.GetBytes(message);
                    sender.Send(data, data.Length, remoteAddress, remotePort);
                    Console.Clear();
                    foreach (var note in historyList)
                    {
                        Console.WriteLine(note.Item1 + " " + note.Item2);
                    }
                    id++;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                sender.Close();
            }
        }

        private static void ReceiveMessage()
        {
            UdpClient receiver = new UdpClient(localPort);
            IPEndPoint remoteIp = null;
            try
            {
                while (true)
                {
                    byte[] data = receiver.Receive(ref remoteIp);
                    string message = Encoding.Unicode.GetString(data);
                    int tempId = 0;
                    foreach (char i in message)
                    {
                        if (i==' ')
                        {
                            message = message.Remove(0, 1);
                            break;
                        }
                        tempId = tempId * 10 + Int32.Parse(i.ToString());
                        message = message.Remove(0, 1);
                    }
                    historyList.Add((tempId, message));
                    historyList.Sort((x, y) => x.Item1.CompareTo(y.Item1));
                    Console.Clear();
                    foreach (var note in historyList)
                    {
                        Console.WriteLine(note.Item1 + " " + note.Item2);
                    }
                    id++;
                    if (historyList.Count > 1)
                        if (tempId != historyList[historyList.Count - 2].Item1 + 1)
                        {
                            Console.WriteLine("Error with message order ");
                        }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                receiver.Close();
            }
        }
    }
}