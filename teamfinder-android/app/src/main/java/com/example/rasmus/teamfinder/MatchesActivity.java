package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
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
import java.util.HashMap;

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
        ArrayList<TextView> playerNames = new ArrayList<TextView>() {{
            add((TextView) findViewById(R.id.playerName1)); add((TextView) findViewById(R.id.playerName2)); add((TextView) findViewById(R.id.playerName3));
            add((TextView) findViewById(R.id.playerName4)); add((TextView) findViewById(R.id.playerName5));
        }};
        ArrayList<TextView> playerPositions = new ArrayList<TextView>() {{
            add((TextView) findViewById(R.id.playerPosition1)); add((TextView) findViewById(R.id.playerPosition2)); add((TextView) findViewById(R.id.playerPosition3));
            add((TextView) findViewById(R.id.playerPosition4)); add((TextView) findViewById(R.id.playerPosition5));
        }};
        ArrayList<TextView> playerRanks = new ArrayList<TextView>() {{
            add((TextView) findViewById(R.id.playerRank1)); add((TextView) findViewById(R.id.playerRank2)); add((TextView) findViewById(R.id.playerRank3));
            add((TextView) findViewById(R.id.playerRank4)); add((TextView) findViewById(R.id.playerRank5));
        }};
        //ArrayList<TextView> playerInfos = findViewById(R.id.playerInfo);
        ArrayList<ImageView> playerImages = new ArrayList<ImageView>() {{
            add((ImageView) findViewById(R.id.playerImage1)); add((ImageView) findViewById(R.id.playerImage2)); add((ImageView) findViewById(R.id.playerImage3));
            add((ImageView) findViewById(R.id.playerImage4)); add((ImageView) findViewById(R.id.playerImage5));
        }};
        String json = prefs.getString("matchedPlayers","");
        ArrayList<Player> matchedPlayers = gson.fromJson(json, new TypeToken<ArrayList<Player>>(){}.getType());

        int j = 0;
        for (int i = matchedPlayers.size() - 1; i >= 0 && i >= matchedPlayers.size() - 5; i--) {
            playerNames.get(j).setText(matchedPlayers.get(i).getName());
            playerPositions.get(j).setText(matchedPlayers.get(i).getPosition());
            playerRanks.get(j).setText(String.format(getResources().getString(R.string.rank_placeholder), matchedPlayers.get(i).getRank()));
            //playerInfos.get(j).setText(matchedPlayers.get(i).getInfo());
            playerImages.get(j).setImageResource(matchedPlayers.get(i).getImageRes());
            j++;
        }

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_matches);
    }

}
