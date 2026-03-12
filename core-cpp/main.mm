#include "firebase/app.h"
#include "firebase/database.h"

// Initialize Firebase
firebase::App* app = firebase::App::Create(firebase::AppOptions());
firebase::database::Database* database = firebase::database::Database::GetInstance(app);
firebase::database::DatabaseReference db_ref = database->GetReference("players/dr_grant");

// Function to update Credits
void UpdateCredits(int new_credits) {
    db_ref.Child("stats/credits").SetValue(new_credits);
}
#import <BugsnagCocos2dx/cocoa/Bugsnag.h>
#import <BugsnagCocos2dx/cocoa/BugsnagCocos2dxPlugin.h>

int main(int argc, char *argv[])
{
    [BugsnagCocos2dxPlugin registerWithCocos2dVersion:cocos2d::cocos2dVersion()];
    [Bugsnag startBugsnagWithApiKey:@"0466c2202771ae3b42bfd95b04570fa7"];
    // ...
}
