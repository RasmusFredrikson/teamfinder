package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import static com.example.rasmus.teamfinder.MyProfileActivity.MY_DISCOVERY_SETTINGS;

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
        setContentView(R.layout.activity_matches);
        SharedPreferences prefs = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE);

        overridePendingTransition(0,0);

        Gson gson = new Gson();
        TextView message = findViewById(R.id.message);
        String json = prefs.getString("matchedPlayerNames","");
        ArrayList<String> matchedPlayerNames = gson.fromJson(json, new TypeToken<ArrayList<String>>(){}.getType());

        message.setText(matchedPlayerNames.get(matchedPlayerNames.size()-1));

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_matches);
    }

}
