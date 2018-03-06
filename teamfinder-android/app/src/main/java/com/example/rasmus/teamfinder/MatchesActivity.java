package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;

public class MatchesActivity extends AppCompatActivity {


    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_discovery:
                    Intent discoverActivityIntent = new Intent(getApplicationContext(), DiscoverActivity.class);
                    startActivity(discoverActivityIntent);
                    return true;
                case R.id.navigation_matches:
                    return true;
                case R.id.navigation_profile:
                    Intent myProfileActivityIntent = new Intent(getApplicationContext(), MyProfileActivity.class);
                    startActivity(myProfileActivityIntent);
                    return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_discover);

        overridePendingTransition(0,0);

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_matches);
    }

}
