package com.example.rasmus.teamfinder;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.MultiTransformation;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mindorks.placeholderview.SwipePlaceHolderView;
import com.mindorks.placeholderview.Utils;
import com.mindorks.placeholderview.annotations.Click;
import com.mindorks.placeholderview.annotations.Layout;
import com.mindorks.placeholderview.annotations.Resolve;
import com.mindorks.placeholderview.annotations.View;
import com.mindorks.placeholderview.annotations.swipe.SwipeCancelState;
import com.mindorks.placeholderview.annotations.swipe.SwipeHead;
import com.mindorks.placeholderview.annotations.swipe.SwipeIn;
import com.mindorks.placeholderview.annotations.swipe.SwipeInState;
import com.mindorks.placeholderview.annotations.swipe.SwipeOut;
import com.mindorks.placeholderview.annotations.swipe.SwipeOutState;
import com.mindorks.placeholderview.annotations.swipe.SwipeView;

import java.util.ArrayList;
import java.util.Random;

import jp.wasabeef.glide.transformations.BlurTransformation;
import jp.wasabeef.glide.transformations.RoundedCornersTransformation;


/**
 * Created by janisharali on 19/08/16.
 */
@Layout(R.layout.player_card_view)
public class PlayerCard {

    @View(R.id.playerImage)
    private ImageView playerImage;

    @View(R.id.playerName)
    private TextView playerNameAndRank;

    @View(R.id.playerPosition)
    private TextView playerPosition;

    @View(R.id.playerInfo)
    private TextView playerInfo;

    @SwipeView
    private android.view.View cardView;

    private Player mPlayer;
    private Context mContext;
    private SwipePlaceHolderView mSwipeView;
    private SharedPreferences mDiscoverySettings;

    public PlayerCard(Context context, Player profile, SwipePlaceHolderView swipeView, SharedPreferences discoverySettings) {
        mContext = context;
        mPlayer = profile;
        mSwipeView = swipeView;
        mDiscoverySettings = discoverySettings;
    }

    @Resolve
    private void onResolved(){
        MultiTransformation multi = new MultiTransformation(
                new BlurTransformation(mContext, 30),
                new RoundedCornersTransformation(
                        mContext, Utils.dpToPx(7), 0,
                        RoundedCornersTransformation.CornerType.TOP));

        Glide.with(mContext).load(mPlayer.getImageRes())
                .bitmapTransform(multi)
                .into(playerImage);
        playerNameAndRank.setText(String.format("%s, Rank %s", mPlayer.getName(), mPlayer.getRank()));
        playerPosition.setText(String.format("Position: %s", mPlayer.getPosition()));
        playerInfo.setText(mPlayer.getInfo());
    }

    @SwipeHead
    private void onSwipeHeadCard() {
        Glide.with(mContext).load(mPlayer.getImageRes())
                .bitmapTransform(new RoundedCornersTransformation(
                        mContext, Utils.dpToPx(7), 0,
                        RoundedCornersTransformation.CornerType.TOP))
                .into(playerImage);
        cardView.invalidate();
    }

    @Click(R.id.playerImage)
    private void onClick(){
        Log.d("EVENT", "playerImage click");
//        mSwipeView.addView(this);
    }

    @SwipeOut
    private void onSwipedOut(){
        Log.d("EVENT", "onSwipedOut");
//        mSwipeView.addView(this);
    }

    @SwipeCancelState
    private void onSwipeCancelState(){
        Log.d("EVENT", "onSwipeCancelState");
    }

    @SwipeIn
    private void onSwipeIn(){
        Log.d("EVENT", "onSwipedIn");
        matchPlayer();
    }

    @SwipeInState
    private void onSwipeInState(){
        Log.d("EVENT", "onSwipeInState");
    }

    @SwipeOutState
    private void onSwipeOutState(){
        Log.d("EVENT", "onSwipeOutState");
    }

    private void matchPlayer() {

        Random r = new Random();
        if (r.nextInt(10) > 5) {
            Vibrator v = (Vibrator) mContext.getSystemService(Context.VIBRATOR_SERVICE);
            // Vibrate for 500 milliseconds
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                v.vibrate(VibrationEffect.createOneShot(300,VibrationEffect.DEFAULT_AMPLITUDE));
            }else{
                //deprecated in API 26
                v.vibrate(300);
            }

            SharedPreferences.Editor editor = mDiscoverySettings.edit();
            Gson gson = new Gson();

            String json = mDiscoverySettings.getString("matchedPlayers", "");
            ArrayList<Player> updatedMatchedPlayerNames;
            if (!json.equals("")) {
                ArrayList<Player> previouslyMatchedPlayerNames = gson.fromJson(json,new TypeToken<ArrayList<Player>>(){}.getType());
                updatedMatchedPlayerNames = new ArrayList<>(previouslyMatchedPlayerNames);
            } else
                updatedMatchedPlayerNames = new ArrayList<>();

            updatedMatchedPlayerNames.add(mPlayer);

            json = gson.toJson(updatedMatchedPlayerNames);
            editor.putString("matchedPlayers", json);
            editor.apply();
        }
    }
}
