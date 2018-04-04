package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;

import static com.example.rasmus.teamfinder.MyProfileActivity.MY_DISCOVERY_SETTINGS;

public class SelectedMatchActivity extends AppCompatActivity {

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
        setContentView(R.layout.activity_selected_match);

        SharedPreferences prefs = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE);
        Gson gson = new Gson();
        String json = prefs.getString("matchedPlayers","");
        ArrayList<Player> matchedPlayers = gson.fromJson(json, new TypeToken<ArrayList<Player>>(){}.getType());
        int playerIndex = 0;
        if (getIntent().getExtras() != null)
            playerIndex = getIntent().getExtras().getInt("PLAYER_INDEX");

        TextView selectedPlayerName = findViewById(R.id.selectedPlayerName);
        TextView selectedPlayerPosition = findViewById(R.id.selectedPlayerPosition);
        TextView selectedPlayerInfo = findViewById(R.id.selectedPlayerInfo);
        ImageView selectedPlayerImage = findViewById(R.id.selectedPlayerImage);

        selectedPlayerName.setText(String.format("%s, Rank %s", matchedPlayers.get(playerIndex).getName(), matchedPlayers.get(playerIndex).getRank()));
        selectedPlayerPosition.setText(String.format("Position: %s", matchedPlayers.get(playerIndex).getPosition()));
        selectedPlayerInfo.setText(matchedPlayers.get(playerIndex).getInfo());
        selectedPlayerImage.setImageResource(matchedPlayers.get(playerIndex).getImageRes());

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_matches);
    }

}
