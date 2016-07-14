var data = {
  "service": "18. Agent Services",
  "last-updated": "11 July 2016",
  "userjourneys": [
    {
      "title": "Live Service (QA environment - July 2016)",
      "path": [{
        "caption": "Sign in page",
        "imgref": "images/web-qa-2016-july/sign-in-page.png",
        "note": "Agents sign in with their Government Gateway account."
      },{
        "caption": "Joining the new service",
        "imgref": "images/web-qa-2016-july/joining-service.png",
        "note": "Agents are asked if they want to switch to the new service. If they select ‘no’ they are redirected to HMRC online portal services."
      },{
        "caption": "Agent's homepage",
        "imgref": "images/web-qa-2016-july/agents-homepage.png",
        "note": "The agent's homepage allows them to view, access and manage: <ul><li>services</li><li>messages</li><li>client registrations</li><li>account settings</li></ul> <strong>note:</strong> Agents services on the digital tax platform <br />only supports PAYE viewing of Allocations and Payments."
      },{
        "caption": "Advert: yes selected",
        "imgref": "images/web-qa-2016-july/switch-yes-selected.png",
        "note": "If agents choose to use the new service, they are told to make sure their client list is kept up to date to avoid Data Protection issues."
      },{
        "caption": "PAYE client list",
        "imgref": "images/web-qa-2016-july/PAYE-client-list.png",
        "note": "Agents can either confirm or remove clients from their list. An agent can only view the details of a confirmed client."
      },{
        "caption": "Confirming clients",
        "imgref": "images/web-qa-2016-july/confirming-clients.png",
        "note": "Once the client is confirmed, the button is replaced with a 'Confirmed' message and the client name becomes a link."
      },{
        "caption": "Removing client - message",
        "imgref": "images/web-qa-2016-july/removing-client-message.png",
        "note": "Confirms what happens when a client is removed and how to restore authorisation if necessary."
      },{
        "caption": "Search for a client",
        "imgref": "images/web-qa-2016-july/client-search.png",
        "note": "Allows agents to search for a specific client."
      },{
        "caption": "Client L&P statement",
        "imgref": "images/web-qa-2016-july/client-summary.png",
        "note": "Shows an overview of the client's payment history and each of their PAYE accounting periods."
      },{
        "caption": "Allocations tab",
        "imgref": "images/web-qa-2016-july/allocations-tab.png",
        "note": "Shows a summary list of client's allocations by month and year."
      },{
        "caption": "Allocations tab expanded",
        "imgref": "images/web-qa-2016-july/allocations-tab-expanded.png",
        "note": "Allows monthly allocations to be expanded to show further details."
      },{
        "caption": "Payments tab",
        "imgref": "images/web-qa-2016-july/payments-tab.png",
        "note": "Shows a summary of payments made by the client by month"
        },{
        "caption": "Payments tab expanded",
        "imgref": "images/web-qa-2016-july/payments-tab-expanded.png",
        "note": "Allows monthly payments to be expanded to show allocations and dates."
      },{
        "caption": "HMRC processing times",
        "imgref": "images/web-qa-2016-july/HMRC-processing-times.png",
        "note": "Gives agents a list of HMRC processing times."
       },{
        "caption": "Survey",
        "imgref": "images/web-qa-2016-july/sign-out-survey.png",
        "note": "Asks agents for feedback on using the service."
      }]
    },{
          "title": "Flags for penalties and notices (Dev environment - July 2016)",
          "path": [{
            "caption": "The Scenario",
            "imgref": "images/dev-july-2016-penalties-interest/1604662658_ba1d5baaa4_o.jpg",
            "note": "I'm Paul, the chief accountant for Chippy Minton, a large industrial carpentry firm. Chippy has recently lost a lot of money on an investment fund due to economic and political instability. It has left him struggling to effectively run his company and pay his staff. Communication about his financial affairs has broken down over the last few months. This means that I am looking a Chippy's overview screen and see various penalty payments and interest on the total amount of tax due. I'm responsible for helping Chippy given his current precarious circumstances. <p>photo by <a href='https://www.flickr.com/photos/metalcowboy/1604662658/in/photolist-3rNjiy-atCcFM-nCBsjF-axgWCZ-ai9vy6-nCTLSd-semec4-axjCKC-atETEf-9pFzj7-axjCv1-7mKmcp-eYQKz7-cUMneL-atCetn-ai9viB-axjCFy-ai9vCK-atCbYi-eYQMxW-9UxthG-aicj19-eYQFwL-aPrKzV-qGzAJB-eYQLTw-eYDgbF-kxSuik-7mKsAx-atCdKR-9o8ar9-pn5Lbq-dyHtVR-8rADJk-ctV83f-fvqJKk-7QyySH-ai9vHx-7mPdY9-dC4vwZ-iCsRz-axgWeV-9o57Xz-axAreG-atCcbc-ai9va6-6E1rZb-a1h8tJ-dCtzLU-7QBTfN'>Swift Benjamin</a> under <a href='https://creativecommons.org/licenses/by/2.0/'>CC BY 4.0</a></p>"
          },{
            "caption": "Account overview",
            "imgref": "images/dev-july-2016-penalties-interest/client-summary.png",
            "note": "As an agent I can see an overview of my client's recent allocations and notice that there are some red flags to indicate that there are some issues in some months"
          },{
            "caption": "Business as Usual",
            "imgref": "images/dev-july-2016-penalties-interest/business-as-usual.png",
            "note": "Business as usual - As an agent, I have submitted my PAYE information (FPS) for the month and I can see that I have paid all tax and NI due."
          },{
            "caption": "Specified Charges",
            "imgref": "images/dev-july-2016-penalties-interest/specified-charges.png",
            "note": "As an agent, I was unable to provide PAYE details as my client has been very uncommunicative and has let some staff go without proper procedure. I can see that HMRC has provided estimated amounts based on last month."
          },{
            "caption": "Penalties and Interest",
            "imgref": "images/dev-july-2016-penalties-interest/penalties-interest.png",
            "note": "Penalty - As an agent, I can see that Chippy has not paid the tax due in time and now faces penalties which are due on the 22nd of each month (3 days earlier if not paying online). I can also now see that the situation has escalated and interest is now being charged on the full amount of tax due as well as the penalty amount."
          }]
        }]
}