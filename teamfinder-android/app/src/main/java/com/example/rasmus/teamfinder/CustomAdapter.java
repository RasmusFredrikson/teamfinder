package com.example.rasmus.teamfinder;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class CustomAdapter extends ArrayAdapter<Player> implements View.OnClickListener{

    private ArrayList<Player> dataSet;
    Context mContext;

    // View lookup cache
    private static class ViewHolder {
        TextView matchedPlayerName;
        TextView matchedPlayerRank;
        TextView matchedPlayerPosition;
        ImageView matchedPlayerImage;
    }

    public CustomAdapter(ArrayList<Player> data, Context context) {
        super(context, R.layout.row_item, data);
        this.dataSet = data;
        this.mContext=context;

    }

    @Override
    public void onClick(View v) {

        int position=(Integer) v.getTag();

        Intent selectedMatchIntent = new Intent(mContext, SelectedMatchActivity.class);
        selectedMatchIntent.putExtra("PLAYER_INDEX", position);
        mContext.startActivity(selectedMatchIntent);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Player Player = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        ViewHolder viewHolder; // view lookup cache stored in tag


        if (convertView == null) {

            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.row_item, parent, false);
            viewHolder.matchedPlayerName = convertView.findViewById(R.id.matchedPlayerName);
            viewHolder.matchedPlayerRank = convertView.findViewById(R.id.matchedPlayerRank);
            viewHolder.matchedPlayerPosition = convertView.findViewById(R.id.matchedPlayerPosition);
            viewHolder.matchedPlayerImage = convertView.findViewById(R.id.matchedPlayerImage);

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.matchedPlayerName.setText(Player.getName());
        viewHolder.matchedPlayerRank.setText(String.format(mContext.getResources().getString(R.string.rank_placeholder), Player.getRank()));
        viewHolder.matchedPlayerPosition.setText(Player.getPosition());
        viewHolder.matchedPlayerImage.setImageResource(Player.getImageRes());
        viewHolder.matchedPlayerImage.setOnClickListener(this);
        // Return the completed view to render on screen
        return convertView;
    }
}